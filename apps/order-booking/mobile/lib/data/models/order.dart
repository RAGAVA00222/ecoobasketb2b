import 'package:flutter/foundation.dart';

enum SyncStatus { pending, synced, rejected }

extension SyncStatusLabel on SyncStatus {
  String get label => switch (this) {
        SyncStatus.pending => 'Pending sync',
        SyncStatus.synced => 'Synced',
        SyncStatus.rejected => 'Sync failed',
      };
}

@immutable
class OrderLine {
  const OrderLine({
    required this.productId,
    required this.productName,
    required this.mrpPaise,
    required this.boxPricePaise,
    required this.qtyBoxes,
  });

  final int productId;
  final String productName;
  final int mrpPaise;
  final int boxPricePaise;
  final int qtyBoxes;

  int get lineTotalPaise => boxPricePaise * qtyBoxes;

  factory OrderLine.fromRow(Map<String, Object?> row) => OrderLine(
        productId: row['product_id'] as int,
        productName: row['product_name'] as String,
        mrpPaise: row['mrp_paise'] as int,
        boxPricePaise: row['box_price_paise'] as int,
        qtyBoxes: row['qty_boxes'] as int,
      );

  Map<String, Object?> toRow(int orderRowId) => {
        'order_row_id': orderRowId,
        'product_id': productId,
        'product_name': productName,
        'mrp_paise': mrpPaise,
        'box_price_paise': boxPricePaise,
        'qty_boxes': qtyBoxes,
        'line_total_paise': lineTotalPaise,
      };
}

@immutable
class BookedOrder {
  const BookedOrder({
    this.rowId,
    required this.clientUuid,
    required this.customerMobile,
    required this.customerName,
    required this.salesmanCode,
    required this.bookedAt,
    required this.lines,
    this.syncStatus = SyncStatus.pending,
    this.syncError,
    this.serverId,
  });

  final int? rowId;

  /// Minted on the device the moment the order is saved. It is the order's
  /// identity from then on, which is what lets a retried sync be a no-op
  /// instead of a second order.
  final String clientUuid;
  final String customerMobile;
  final String customerName;
  final String salesmanCode;
  final DateTime bookedAt;
  final List<OrderLine> lines;
  final SyncStatus syncStatus;
  final String? syncError;
  final int? serverId;

  int get totalProducts => lines.length;
  int get totalBoxes =>
      lines.fold(0, (sum, line) => sum + line.qtyBoxes);
  int get totalValuePaise =>
      lines.fold(0, (sum, line) => sum + line.lineTotalPaise);

  /// Local calendar day. The load sheet is a day's work as the salesman
  /// lived it, so the date comes from the device's wall clock, not UTC.
  DateTime get orderDate =>
      DateTime(bookedAt.year, bookedAt.month, bookedAt.day);

  BookedOrder copyWith({
    int? rowId,
    List<OrderLine>? lines,
    String? customerName,
    SyncStatus? syncStatus,
    String? syncError,
    int? serverId,
  }) =>
      BookedOrder(
        rowId: rowId ?? this.rowId,
        clientUuid: clientUuid,
        customerMobile: customerMobile,
        customerName: customerName ?? this.customerName,
        salesmanCode: salesmanCode,
        bookedAt: bookedAt,
        lines: lines ?? this.lines,
        syncStatus: syncStatus ?? this.syncStatus,
        syncError: syncError ?? this.syncError,
        serverId: serverId ?? this.serverId,
      );

  factory BookedOrder.fromRow(
    Map<String, Object?> row,
    List<OrderLine> lines,
  ) =>
      BookedOrder(
        rowId: row['row_id'] as int?,
        clientUuid: row['client_uuid'] as String,
        customerMobile: row['customer_mobile'] as String,
        customerName: row['customer_name'] as String,
        salesmanCode: row['salesman_code'] as String,
        bookedAt: DateTime.fromMillisecondsSinceEpoch(
          row['booked_at'] as int,
        ),
        lines: lines,
        syncStatus: SyncStatus.values[row['sync_status'] as int],
        syncError: row['sync_error'] as String?,
        serverId: row['server_id'] as int?,
      );

  Map<String, Object?> toRow() => {
        if (rowId != null) 'row_id': rowId,
        'client_uuid': clientUuid,
        'customer_mobile': customerMobile,
        'customer_name': customerName,
        'salesman_code': salesmanCode,
        'booked_at': bookedAt.millisecondsSinceEpoch,
        'order_date': _dayKey(bookedAt),
        'total_products': totalProducts,
        'total_boxes': totalBoxes,
        'total_value_paise': totalValuePaise,
        'sync_status': syncStatus.index,
        'sync_error': syncError,
        'server_id': serverId,
        'is_deleted': 0,
      };

  Map<String, dynamic> toApi() => {
        'client_uuid': clientUuid,
        'mobile': customerMobile,
        'customer_name': customerName,
        'salesman_code': salesmanCode,
        'booked_at': bookedAt.toUtc().toIso8601String(),
        'items': [
          for (final line in lines)
            {'product_id': line.productId, 'qty_boxes': line.qtyBoxes},
        ],
      };
}

/// `YYYY-MM-DD` in local time. Stored as text so "today's orders" is one
/// indexed equality lookup rather than a range scan over timestamps.
String dayKey(DateTime moment) => _dayKey(moment);

String _dayKey(DateTime moment) {
  final local = moment.toLocal();
  final month = local.month.toString().padLeft(2, '0');
  final day = local.day.toString().padLeft(2, '0');
  return '${local.year}-$month-$day';
}
