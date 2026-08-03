import 'package:ecoo_order_booking/data/local/app_database.dart';
import 'package:ecoo_order_booking/data/local/customer_dao.dart';
import 'package:ecoo_order_booking/data/local/order_dao.dart';
import 'package:ecoo_order_booking/data/models/customer.dart';
import 'package:ecoo_order_booking/data/models/order.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

BookedOrder order({
  required String uuid,
  required String mobile,
  required String name,
  required List<OrderLine> lines,
  DateTime? at,
  SyncStatus status = SyncStatus.pending,
}) =>
    BookedOrder(
      clientUuid: uuid,
      customerMobile: mobile,
      customerName: name,
      salesmanCode: 'SM01',
      bookedAt: at ?? DateTime.now(),
      lines: lines,
      syncStatus: status,
    );

OrderLine line(int productId, String name, int boxPricePaise, int qty) =>
    OrderLine(
      productId: productId,
      productName: name,
      mrpPaise: 1000,
      boxPricePaise: boxPricePaise,
      qtyBoxes: qty,
    );

void main() {
  sqfliteFfiInit();
  databaseFactory = databaseFactoryFfi;

  late AppDatabase database;
  late OrderDao orders;
  late CustomerDao customers;

  setUp(() async {
    database = await AppDatabase.open(path: inMemoryDatabasePath);
    orders = OrderDao(database);
    customers = CustomerDao(database);
  });

  tearDown(() => database.close());

  test('an order round-trips with its lines intact', () async {
    final booked = order(
      uuid: 'uuid-1',
      mobile: '9876543210',
      name: 'Sri Stores',
      lines: [line(1, 'Good Day', 92000, 5), line(2, 'Milk Bikis', 88000, 3)],
    );
    final rowId = await orders.save(booked);

    final loaded = await orders.byRowId(rowId);
    expect(loaded, isNotNull);
    expect(loaded!.lines, hasLength(2));
    expect(loaded.totalBoxes, 8);
    expect(loaded.totalValuePaise, 5 * 92000 + 3 * 88000);
    expect(loaded.customerName, 'Sri Stores');
  });

  test("today's list is scoped to today and ordered newest first", () async {
    final today = DateTime.now();
    final yesterday = today.subtract(const Duration(days: 1));

    await orders.save(order(
      uuid: 'uuid-old',
      mobile: '9000000001',
      name: 'Yesterday Stores',
      lines: [line(1, 'Good Day', 92000, 2)],
      at: yesterday,
    ));
    await orders.save(order(
      uuid: 'uuid-early',
      mobile: '9000000002',
      name: 'Morning Stores',
      lines: [line(1, 'Good Day', 92000, 2)],
      at: today.subtract(const Duration(minutes: 30)),
    ));
    await orders.save(order(
      uuid: 'uuid-late',
      mobile: '9000000003',
      name: 'Just Now Stores',
      lines: [line(1, 'Good Day', 92000, 2)],
      at: today,
    ));

    final list = await orders.ordersOn(dayKey(today));
    expect(
      [for (final o in list) o.customerName],
      ['Just Now Stores', 'Morning Stores'],
    );
  });

  test('day stats count each shop once even with repeat orders', () async {
    final today = dayKey(DateTime.now());
    await orders.save(order(
      uuid: 'uuid-1',
      mobile: '9876543210',
      name: 'Sri Stores',
      lines: [line(1, 'Good Day', 92000, 5)],
    ));
    await orders.save(order(
      uuid: 'uuid-2',
      mobile: '9876543210',
      name: 'Sri Stores',
      lines: [line(2, 'Milk Bikis', 88000, 3)],
    ));

    final stats = await orders.statsFor(today);
    expect(stats.orders, 2);
    expect(stats.customers, 1);
    expect(stats.boxes, 8);
    expect(stats.valuePaise, 5 * 92000 + 3 * 88000);
  });

  test('the load sheet adds a product across every shop that ordered it',
      () async {
    final today = dayKey(DateTime.now());
    await orders.save(order(
      uuid: 'uuid-1',
      mobile: '9876543210',
      name: 'Sri Stores',
      lines: [line(1, 'Good Day', 92000, 5), line(2, 'Milk Bikis', 88000, 3)],
    ));
    await orders.save(order(
      uuid: 'uuid-2',
      mobile: '9876543211',
      name: 'Amman Stores',
      lines: [line(1, 'Good Day', 92000, 7)],
    ));

    final totals = await orders.productTotals(today);
    expect(totals.first.productName, 'Good Day');
    expect(totals.first.boxes, 12, reason: 'most boxes first');
    expect(totals.last.productName, 'Milk Bikis');
    expect(totals.last.boxes, 3);
  });

  test('a deleted order disappears from the list, the stats and the load sheet',
      () async {
    final today = dayKey(DateTime.now());
    final rowId = await orders.save(order(
      uuid: 'uuid-1',
      mobile: '9876543210',
      name: 'Sri Stores',
      lines: [line(1, 'Good Day', 92000, 5)],
    ));

    await orders.softDelete(rowId);

    expect(await orders.ordersOn(today), isEmpty);
    expect((await orders.statsFor(today)).boxes, 0);
    expect(await orders.productTotals(today), isEmpty);
  });

  test('search matches on name or on mobile', () async {
    final today = dayKey(DateTime.now());
    await orders.save(order(
      uuid: 'uuid-1',
      mobile: '9876543210',
      name: 'Sri Stores',
      lines: [line(1, 'Good Day', 92000, 5)],
    ));
    await orders.save(order(
      uuid: 'uuid-2',
      mobile: '9000000000',
      name: 'Amman Stores',
      lines: [line(1, 'Good Day', 92000, 5)],
    ));

    expect((await orders.ordersOn(today, query: 'amman')).single.customerName,
        'Amman Stores');
    expect((await orders.ordersOn(today, query: '98765')).single.customerName,
        'Sri Stores');
    expect(await orders.ordersOn(today, query: 'nobody'), isEmpty);
  });

  test('the outbox holds unsynced orders and releases them when accepted',
      () async {
    await orders.save(order(
      uuid: 'uuid-1',
      mobile: '9876543210',
      name: 'Sri Stores',
      lines: [line(1, 'Good Day', 92000, 5)],
    ));
    expect(await orders.pendingCount(), 1);
    expect((await orders.pendingOutbox()).single.lines, hasLength(1));

    await orders.markSynced('uuid-1', 42);
    expect(await orders.pendingCount(), 0);
    expect((await orders.byRowId(1))!.serverId, 42);
  });

  test('a rejected order can be put back in the queue by hand', () async {
    await orders.save(order(
      uuid: 'uuid-1',
      mobile: '9876543210',
      name: 'Sri Stores',
      lines: [line(1, 'Good Day', 92000, 5)],
    ));
    await orders.markRejected('uuid-1', 'unknown product');
    expect(await orders.pendingCount(), 0);

    await orders.requeueRejected();
    expect(await orders.pendingCount(), 1);
    expect((await orders.byRowId(1))!.syncError, isNull);
  });

  test('editing an order replaces its lines and re-queues it for sync',
      () async {
    final rowId = await orders.save(order(
      uuid: 'uuid-1',
      mobile: '9876543210',
      name: 'Sri Stores',
      lines: [line(1, 'Good Day', 92000, 5)],
      status: SyncStatus.synced,
    ));

    final edited = order(
      uuid: 'uuid-1',
      mobile: '9876543210',
      name: 'Sri Super Stores',
      lines: [line(1, 'Good Day', 92000, 2), line(2, 'Milk Bikis', 88000, 1)],
    );
    await orders.replaceLines(rowId, edited);

    final loaded = (await orders.byRowId(rowId))!;
    expect(loaded.lines, hasLength(2));
    expect(loaded.customerName, 'Sri Super Stores');
    expect(loaded.totalBoxes, 3);
    expect(loaded.syncStatus, SyncStatus.pending);
  });

  test('customer lookup is insensitive to how the number was typed', () async {
    await customers.upsert(Customer(
      mobile: '9876543210',
      name: 'Sri Stores',
      updatedAt: DateTime.now().toUtc(),
    ));

    expect((await customers.findByMobile('+91 98765 43210'))?.name,
        'Sri Stores');
    expect((await customers.findByMobile('09876543210'))?.name, 'Sri Stores');
    expect(await customers.findByMobile('9000000000'), isNull);
  });
}
