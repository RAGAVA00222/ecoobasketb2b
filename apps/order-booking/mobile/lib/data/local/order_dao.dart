import 'package:sqflite/sqflite.dart';

import '../models/order.dart';
import 'app_database.dart';

/// Headline numbers for one day. Computed by SQLite in a single pass so the
/// dashboard does not have to load orders into Dart to add them up.
class DayStats {
  const DayStats({
    required this.orders,
    required this.customers,
    required this.boxes,
    required this.valuePaise,
  });

  final int orders;
  final int customers;
  final int boxes;
  final int valuePaise;

  static const empty =
      DayStats(orders: 0, customers: 0, boxes: 0, valuePaise: 0);
}

class ProductTotal {
  const ProductTotal({
    required this.productId,
    required this.productName,
    required this.boxes,
    required this.valuePaise,
  });

  final int productId;
  final String productName;
  final int boxes;
  final int valuePaise;
}

class CustomerTotal {
  const CustomerTotal({
    required this.mobile,
    required this.name,
    required this.orders,
    required this.boxes,
    required this.valuePaise,
  });

  final String mobile;
  final String name;
  final int orders;
  final int boxes;
  final int valuePaise;
}

class OrderDao {
  OrderDao(this._app);

  final AppDatabase _app;
  Database get _db => _app.db;

  /// Header and lines in one transaction. The order either exists whole or
  /// not at all — a half-written order would poison the load sheet.
  Future<int> save(BookedOrder order) async {
    return _db.transaction((txn) async {
      final rowId = await txn.insert('orders', order.toRow(),
          conflictAlgorithm: ConflictAlgorithm.replace);
      final batch = txn.batch();
      for (final line in order.lines) {
        batch.insert('order_lines', line.toRow(rowId));
      }
      await batch.commit(noResult: true);
      return rowId;
    });
  }

  Future<void> replaceLines(int rowId, BookedOrder updated) async {
    await _db.transaction((txn) async {
      await txn.delete('order_lines',
          where: 'order_row_id = ?', whereArgs: [rowId]);
      final batch = txn.batch();
      for (final line in updated.lines) {
        batch.insert('order_lines', line.toRow(rowId));
      }
      await batch.commit(noResult: true);
      await txn.update(
        'orders',
        {
          'customer_name': updated.customerName,
          'total_products': updated.totalProducts,
          'total_boxes': updated.totalBoxes,
          'total_value_paise': updated.totalValuePaise,
          // An edited order has to go back through sync, so it returns to the
          // outbox rather than staying marked as synced.
          'sync_status': SyncStatus.pending.index,
          'sync_error': null,
        },
        where: 'row_id = ?',
        whereArgs: [rowId],
      );
    });
  }

  Future<void> softDelete(int rowId) async {
    await _db.update('orders', {'is_deleted': 1},
        where: 'row_id = ?', whereArgs: [rowId]);
  }

  Future<List<BookedOrder>> ordersOn(String day, {String? query}) async {
    var where = 'order_date = ? AND is_deleted = 0';
    final args = <Object?>[day];
    if (query != null && query.trim().isNotEmpty) {
      final needle = '%${query.trim().toLowerCase()}%';
      where += ' AND (LOWER(customer_name) LIKE ? OR customer_mobile LIKE ?)';
      args..add(needle)..add(needle);
    }
    final headers = await _db.query('orders',
        where: where, whereArgs: args, orderBy: 'booked_at DESC');
    if (headers.isEmpty) return const [];

    // One query for every line of the day, grouped in Dart. Beats N+1 queries
    // when a salesman has booked 60 orders.
    final ids = headers.map((h) => h['row_id'] as int).toList();
    final placeholders = List.filled(ids.length, '?').join(',');
    final lineRows = await _db.query('order_lines',
        where: 'order_row_id IN ($placeholders)', whereArgs: ids, orderBy: 'id ASC');

    final byOrder = <int, List<OrderLine>>{};
    for (final row in lineRows) {
      (byOrder[row['order_row_id'] as int] ??= <OrderLine>[])
          .add(OrderLine.fromRow(row));
    }

    return [
      for (final header in headers)
        BookedOrder.fromRow(header, byOrder[header['row_id'] as int] ?? const []),
    ];
  }

  Future<BookedOrder?> byRowId(int rowId) async {
    final headers = await _db
        .query('orders', where: 'row_id = ?', whereArgs: [rowId], limit: 1);
    if (headers.isEmpty) return null;
    final lineRows = await _db.query('order_lines',
        where: 'order_row_id = ?', whereArgs: [rowId], orderBy: 'id ASC');
    return BookedOrder.fromRow(
      headers.first,
      lineRows.map(OrderLine.fromRow).toList(),
    );
  }

  /// The shop's previous order, for the "Frequently Ordered" one-tap repeat.
  ///
  /// Answered from local SQLite on an indexed lookup, so it lands while the
  /// salesman is still reading the customer's name — a network round trip
  /// here would defeat the whole point.
  Future<BookedOrder?> lastOrderFor(String mobile, {String? excludeUuid}) async {
    final headers = await _db.query(
      'orders',
      where: 'customer_mobile = ? AND is_deleted = 0'
          '${excludeUuid == null ? '' : ' AND client_uuid != ?'}',
      whereArgs: [mobile, if (excludeUuid != null) excludeUuid],
      orderBy: 'booked_at DESC',
      limit: 1,
    );
    if (headers.isEmpty) return null;
    final rowId = headers.first['row_id'] as int;
    final lineRows = await _db.query('order_lines',
        where: 'order_row_id = ?', whereArgs: [rowId], orderBy: 'id ASC');
    return BookedOrder.fromRow(
      headers.first,
      lineRows.map(OrderLine.fromRow).toList(),
    );
  }

  Future<DayStats> statsFor(String fromDay, [String? toDay]) async {
    final rows = await _db.rawQuery('''
      SELECT COUNT(*) AS orders,
             COUNT(DISTINCT customer_mobile) AS customers,
             COALESCE(SUM(total_boxes), 0) AS boxes,
             COALESCE(SUM(total_value_paise), 0) AS value
      FROM orders
      WHERE is_deleted = 0 AND order_date BETWEEN ? AND ?
    ''', [fromDay, toDay ?? fromDay]);
    final row = rows.first;
    return DayStats(
      orders: (row['orders'] as int?) ?? 0,
      customers: (row['customers'] as int?) ?? 0,
      boxes: (row['boxes'] as int?) ?? 0,
      valuePaise: (row['value'] as int?) ?? 0,
    );
  }

  /// The load sheet, computed on the device. Warehouse totals are available
  /// even when the salesman never got signal all day.
  Future<List<ProductTotal>> productTotals(String fromDay, [String? toDay]) async {
    final rows = await _db.rawQuery('''
      SELECT l.product_id AS product_id,
             MIN(l.product_name) AS product_name,
             SUM(l.qty_boxes) AS boxes,
             SUM(l.line_total_paise) AS value
      FROM order_lines l
      JOIN orders o ON o.row_id = l.order_row_id
      WHERE o.is_deleted = 0 AND o.order_date BETWEEN ? AND ?
      GROUP BY l.product_id
      ORDER BY boxes DESC
    ''', [fromDay, toDay ?? fromDay]);
    return [
      for (final row in rows)
        ProductTotal(
          productId: row['product_id'] as int,
          productName: row['product_name'] as String,
          boxes: (row['boxes'] as int?) ?? 0,
          valuePaise: (row['value'] as int?) ?? 0,
        ),
    ];
  }

  Future<List<CustomerTotal>> customerTotals(String fromDay,
      [String? toDay]) async {
    final rows = await _db.rawQuery('''
      SELECT customer_mobile AS mobile,
             MAX(customer_name) AS name,
             COUNT(*) AS orders,
             SUM(total_boxes) AS boxes,
             SUM(total_value_paise) AS value
      FROM orders
      WHERE is_deleted = 0 AND order_date BETWEEN ? AND ?
      GROUP BY customer_mobile
      ORDER BY value DESC
    ''', [fromDay, toDay ?? fromDay]);
    return [
      for (final row in rows)
        CustomerTotal(
          mobile: row['mobile'] as String,
          name: row['name'] as String,
          orders: (row['orders'] as int?) ?? 0,
          boxes: (row['boxes'] as int?) ?? 0,
          valuePaise: (row['value'] as int?) ?? 0,
        ),
    ];
  }

  // ---------------- outbox ----------------

  Future<List<BookedOrder>> pendingOutbox({int limit = 50}) async {
    final headers = await _db.query('orders',
        where: 'sync_status = ? AND is_deleted = 0',
        whereArgs: [SyncStatus.pending.index],
        orderBy: 'booked_at ASC',
        limit: limit);
    if (headers.isEmpty) return const [];
    final ids = headers.map((h) => h['row_id'] as int).toList();
    final placeholders = List.filled(ids.length, '?').join(',');
    final lineRows = await _db.query('order_lines',
        where: 'order_row_id IN ($placeholders)', whereArgs: ids);
    final byOrder = <int, List<OrderLine>>{};
    for (final row in lineRows) {
      (byOrder[row['order_row_id'] as int] ??= <OrderLine>[])
          .add(OrderLine.fromRow(row));
    }
    return [
      for (final header in headers)
        BookedOrder.fromRow(header, byOrder[header['row_id'] as int] ?? const []),
    ];
  }

  Future<int> pendingCount() async =>
      Sqflite.firstIntValue(await _db.rawQuery(
        'SELECT COUNT(*) FROM orders WHERE sync_status = ? AND is_deleted = 0',
        [SyncStatus.pending.index],
      )) ??
      0;

  Future<void> markSynced(String clientUuid, int? serverId) async {
    await _db.update(
      'orders',
      {
        'sync_status': SyncStatus.synced.index,
        'server_id': serverId,
        'sync_error': null,
      },
      where: 'client_uuid = ?',
      whereArgs: [clientUuid],
    );
  }

  Future<void> markRejected(String clientUuid, String reason) async {
    await _db.update(
      'orders',
      {'sync_status': SyncStatus.rejected.index, 'sync_error': reason},
      where: 'client_uuid = ?',
      whereArgs: [clientUuid],
    );
  }

  /// Puts failed orders back in the queue — used by the manual "retry" the
  /// settings screen offers when a rejection was the server's fault.
  Future<void> requeueRejected() async {
    await _db.update(
      'orders',
      {'sync_status': SyncStatus.pending.index, 'sync_error': null},
      where: 'sync_status = ?',
      whereArgs: [SyncStatus.rejected.index],
    );
  }
}
