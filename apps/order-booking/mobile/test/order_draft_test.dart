import 'package:ecoo_order_booking/data/models/customer.dart';
import 'package:ecoo_order_booking/data/models/order.dart';
import 'package:ecoo_order_booking/data/models/product.dart';
import 'package:ecoo_order_booking/state/order_draft.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

Product product(
  int id,
  String name,
  int boxPricePaise, {
  String brand = 'Britannia',
  int unitsPerBox = 1,
  int mrpPaise = 1000,
}) =>
    Product(
      id: id,
      sku: 'SKU-$id',
      name: name,
      brand: brand,
      mrpPaise: mrpPaise,
      unitsPerBox: unitsPerBox,
      boxPricePaise: boxPricePaise,
      updatedAt: DateTime.utc(2026, 1, 1),
      searchIndex: Product.buildSearchIndex(name, 'SKU-$id', brand),
    );

void main() {
  final goodDay = product(1, 'Good Day', 92000); // ₹920 a box
  final milkBikis = product(2, 'Milk Bikis', 88000); // ₹880 a box

  late ProviderContainer container;
  // Local functions, not getters: each call re-reads the container so tests
  // always see the current state rather than a stale snapshot.
  OrderDraftNotifier notifier() => container.read(orderDraftProvider.notifier);
  OrderDraft draft() => container.read(orderDraftProvider);

  setUp(() => container = ProviderContainer());
  tearDown(() => container.dispose());

  test('totals track the quantities as they are tapped in', () {
    notifier().setQty(goodDay, 5);
    notifier().setQty(milkBikis, 3);

    expect(draft().totalProducts, 2);
    expect(draft().totalBoxes, 8);
    expect(draft().totalValuePaise, 5 * 92000 + 3 * 88000); // ₹7,240
  });

  test('incremental totals match a full recount after many edits', () {
    // The totals are maintained incrementally for speed; this is the check
    // that the shortcut never drifts from the honest sum.
    for (var i = 1; i <= 20; i++) {
      notifier().setQty(goodDay, i);
      notifier().setQty(milkBikis, 20 - i);
    }
    notifier().decrement(goodDay);
    notifier().increment(milkBikis);

    final recount = draft().lines.values
        .fold<int>(0, (sum, line) => sum + line.lineTotalPaise);
    final boxes =
        draft().lines.values.fold<int>(0, (sum, line) => sum + line.qtyBoxes);
    expect(draft().totalValuePaise, recount);
    expect(draft().totalBoxes, boxes);
  });

  test('dropping to zero removes the line instead of booking a zero', () {
    notifier().setQty(goodDay, 2);
    notifier().setQty(goodDay, 0);

    expect(draft().lines, isEmpty);
    expect(draft().totalBoxes, 0);
    expect(draft().totalValuePaise, 0);
  });

  test('decrementing past zero cannot go negative', () {
    notifier().decrement(goodDay);
    notifier().decrement(goodDay);

    expect(draft().qtyFor(goodDay.id), 0);
    expect(draft().totalBoxes, 0);
  });

  test('an order is not saveable without a number, a name and a box', () {
    expect(draft().canSave, isFalse);

    notifier().setMobile('9876543210');
    expect(draft().canSave, isFalse, reason: 'no name, no products yet');

    notifier().setCustomerName('Sri Stores');
    expect(draft().canSave, isFalse, reason: 'still no products');

    notifier().setQty(goodDay, 1);
    expect(draft().canSave, isTrue);
  });

  test('an incomplete mobile number blocks the save', () {
    notifier().setMobile('98765');
    notifier().setCustomerName('Sri Stores');
    notifier().setQty(goodDay, 1);
    expect(draft().canSave, isFalse);
  });

  test('a known customer fills the name and marks the shop as known', () {
    notifier().applyKnownCustomer(
      Customer(
        mobile: '9876543210',
        name: 'Sri Stores',
        updatedAt: DateTime.utc(2026, 1, 1),
      ),
    );
    expect(draft().customerName, 'Sri Stores');
    expect(draft().customerKnown, isTrue);
  });

  test('changing the number clears an auto-filled name', () {
    notifier().applyKnownCustomer(
      Customer(
        mobile: '9876543210',
        name: 'Sri Stores',
        updatedAt: DateTime.utc(2026, 1, 1),
      ),
    );
    notifier().setMobile('9000000000');

    expect(draft().customerName, isEmpty);
    expect(draft().customerKnown, isFalse);
  });

  test('reformatting the same number keeps the auto-filled name', () {
    notifier().applyKnownCustomer(
      Customer(
        mobile: '9876543210',
        name: 'Sri Stores',
        updatedAt: DateTime.utc(2026, 1, 1),
      ),
    );
    notifier().setMobile('+91 98765 43210');

    expect(draft().customerName, 'Sri Stores');
    expect(draft().customerKnown, isTrue);
  });

  test('save-and-next leaves nothing behind for the next customer', () {
    notifier().setMobile('9876543210');
    notifier().setCustomerName('Sri Stores');
    notifier().setQty(goodDay, 4);

    notifier().reset();

    expect(draft().mobile, isEmpty);
    expect(draft().customerName, isEmpty);
    expect(draft().lines, isEmpty);
    expect(draft().totalBoxes, 0);
    expect(draft().totalValuePaise, 0);
    expect(draft().canSave, isFalse);
  });

  test('the booked order carries the price as it was at booking time', () {
    notifier().setMobile('+91 98765 43210');
    notifier().setCustomerName('  Sri Stores  ');
    notifier().setQty(goodDay, 5);

    final order = draft().toBookedOrder(salesmanCode: 'SM01');

    expect(order.customerMobile, '9876543210', reason: 'normalised on the way out');
    expect(order.customerName, 'Sri Stores');
    expect(order.salesmanCode, 'SM01');
    expect(order.clientUuid, isNotEmpty);
    expect(order.lines.single.boxPricePaise, 92000);
    expect(order.totalValuePaise, 460000);
    expect(order.totalBoxes, 5);
  });

  test('loading an order back in reproduces its totals for editing', () {
    notifier().setMobile('9876543210');
    notifier().setCustomerName('Sri Stores');
    notifier().setQty(goodDay, 5);
    notifier().setQty(milkBikis, 3);
    final booked = draft().toBookedOrder(salesmanCode: 'SM01');

    notifier().reset();
    notifier().loadFrom(booked, {goodDay.id: goodDay, milkBikis.id: milkBikis});

    expect(draft().customerName, 'Sri Stores');
    expect(draft().totalBoxes, 8);
    expect(draft().totalValuePaise, booked.totalValuePaise);
    expect(draft().canSave, isTrue);
  });

  test('a product retired since booking is dropped, not left as a ghost line', () {
    notifier().setMobile('9876543210');
    notifier().setCustomerName('Sri Stores');
    notifier().setQty(goodDay, 5);
    notifier().setQty(milkBikis, 3);
    final booked = draft().toBookedOrder(salesmanCode: 'SM01');

    notifier().reset();
    notifier().loadFrom(booked, {goodDay.id: goodDay}); // Milk Bikis delisted

    expect(draft().lines.keys, [goodDay.id]);
    expect(draft().totalBoxes, 5);
    expect(draft().totalValuePaise, 460000);
  });

  group('one-tap repeat', () {
    BookedOrder previousOrder(Map<Product, int> basket) => BookedOrder(
          clientUuid: 'uuid-previous-01',
          customerMobile: '9876543210',
          customerName: 'Sri Stores',
          salesmanCode: 'SM01',
          bookedAt: DateTime.now().subtract(const Duration(days: 7)),
          lines: [
            for (final entry in basket.entries)
              OrderLine(
                productId: entry.key.id,
                productName: entry.key.name,
                mrpPaise: entry.key.mrpPaise,
                boxPricePaise: entry.key.boxPricePaise,
                qtyBoxes: entry.value,
              ),
          ],
        );

    test('drops last week\'s quantities in without touching the customer', () {
      notifier().setMobile('9876543210');
      notifier().setCustomerName('Sri Stores');

      final applied = notifier().applyPreviousQuantities(
        previousOrder({goodDay: 5, milkBikis: 8}),
        {goodDay.id: goodDay, milkBikis.id: milkBikis},
      );

      expect(applied, 2);
      expect(draft().qtyFor(goodDay.id), 5);
      expect(draft().qtyFor(milkBikis.id), 8);
      expect(draft().totalBoxes, 13);
      expect(draft().customerName, 'Sri Stores', reason: 'customer untouched');
    });

    test('re-prices from today, not from the old order', () {
      // The previous order was booked at a lower rate; repeating it must
      // quote today's price, because it is a new sale.
      final cheaperThen = OrderLine(
        productId: goodDay.id,
        productName: goodDay.name,
        mrpPaise: goodDay.mrpPaise,
        boxPricePaise: 50000, // ₹500 back then
        qtyBoxes: 2,
      );
      final previous = BookedOrder(
        clientUuid: 'uuid-previous-02',
        customerMobile: '9876543210',
        customerName: 'Sri Stores',
        salesmanCode: 'SM01',
        bookedAt: DateTime.now(),
        lines: [cheaperThen],
      );

      notifier().applyPreviousQuantities(previous, {goodDay.id: goodDay});

      expect(draft().totalValuePaise, 2 * 92000, reason: "today's ₹920 a box");
    });

    test('never reduces a quantity already keyed in by hand', () {
      notifier().setQty(goodDay, 12);

      notifier().applyPreviousQuantities(
        previousOrder({goodDay: 5, milkBikis: 3}),
        {goodDay.id: goodDay, milkBikis.id: milkBikis},
      );

      expect(draft().qtyFor(goodDay.id), 12, reason: 'the higher one wins');
      expect(draft().qtyFor(milkBikis.id), 3);
    });

    test('silently skips products that are no longer stocked', () {
      final applied = notifier().applyPreviousQuantities(
        previousOrder({goodDay: 5, milkBikis: 8}),
        {goodDay.id: goodDay}, // Milk Bikis delisted
      );

      expect(applied, 1);
      expect(draft().lines.keys, [goodDay.id]);
      expect(draft().totalBoxes, 5);
    });

    test('repeating twice is idempotent', () {
      final previous = previousOrder({goodDay: 5});
      final catalogue = {goodDay.id: goodDay};

      notifier().applyPreviousQuantities(previous, catalogue);
      final second = notifier().applyPreviousQuantities(previous, catalogue);

      expect(second, 0, reason: 'nothing left to apply');
      expect(draft().totalBoxes, 5);
    });
  });

  group('pack size', () {
    test('per-unit rate is derived from the box rate and pack size', () {
      // Milk Classic: ₹1,067 a box of 120 -> ₹8.89 a packet, matching the
      // distributor's own rate sheet.
      final milkClassic =
          product(9, 'Milk Classic', 106700, unitsPerBox: 120);
      expect(milkClassic.unitPricePaise, 889);
    });

    test('a missing MRP is reported as absent, not as zero', () {
      final maaza = product(10, 'Maaza 1.75 L', 68800,
          unitsPerBox: 12, mrpPaise: 0);
      expect(maaza.hasMrp, isFalse);
      expect(product(11, 'Parle-G', 63000).hasMrp, isTrue);
    });

    test('a single-unit box does not divide by anything odd', () {
      expect(product(12, 'Loose', 50000, unitsPerBox: 1).unitPricePaise, 50000);
    });
  });
}
