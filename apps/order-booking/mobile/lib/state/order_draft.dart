import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:uuid/uuid.dart';

import '../data/models/customer.dart';
import '../data/models/order.dart';
import '../data/models/product.dart';
import '../core/mobile_number.dart';

@immutable
class DraftLine {
  const DraftLine({required this.product, required this.qtyBoxes});
  final Product product;
  final int qtyBoxes;
  int get lineTotalPaise => product.boxPricePaise * qtyBoxes;
}

@immutable
class OrderDraft {
  const OrderDraft({
    this.mobile = '',
    this.customerName = '',
    this.customerKnown = false,
    this.lines = const {},
    this.totalBoxes = 0,
    this.totalValuePaise = 0,
  });

  final String mobile;
  final String customerName;

  /// True when the mobile matched a shop we already know, which is what turns
  /// the name field from "type it" into "it is already there".
  final bool customerKnown;

  /// productId -> line. A map, not a list, so a `+` tap is a single hash
  /// lookup no matter how many products are in the order.
  final Map<int, DraftLine> lines;

  /// Totals are carried on the state and updated incrementally rather than
  /// recomputed by folding every line on each tap. At 40 lines and a salesman
  /// hammering `+`, the difference is the frame budget.
  final int totalBoxes;
  final int totalValuePaise;

  int get totalProducts => lines.length;

  bool get isEmpty => lines.isEmpty;

  /// What the save button gates on. Deliberately minimal: a number, a name,
  /// and at least one box.
  bool get canSave =>
      isCompleteMobile(mobile) &&
      customerName.trim().isNotEmpty &&
      lines.isNotEmpty;

  int qtyFor(int productId) => lines[productId]?.qtyBoxes ?? 0;

  OrderDraft copyWith({
    String? mobile,
    String? customerName,
    bool? customerKnown,
    Map<int, DraftLine>? lines,
    int? totalBoxes,
    int? totalValuePaise,
  }) =>
      OrderDraft(
        mobile: mobile ?? this.mobile,
        customerName: customerName ?? this.customerName,
        customerKnown: customerKnown ?? this.customerKnown,
        lines: lines ?? this.lines,
        totalBoxes: totalBoxes ?? this.totalBoxes,
        totalValuePaise: totalValuePaise ?? this.totalValuePaise,
      );

  BookedOrder toBookedOrder({required String salesmanCode, String? uuid}) =>
      BookedOrder(
        clientUuid: uuid ?? const Uuid().v4(),
        customerMobile: normaliseMobile(mobile),
        customerName: customerName.trim(),
        salesmanCode: salesmanCode,
        bookedAt: DateTime.now(),
        lines: [
          for (final line in lines.values)
            OrderLine(
              productId: line.product.id,
              productName: line.product.name,
              mrpPaise: line.product.mrpPaise,
              // Price is copied into the order now. If admin re-prices
              // tomorrow, today's booking keeps today's price.
              boxPricePaise: line.product.boxPricePaise,
              qtyBoxes: line.qtyBoxes,
            ),
        ],
      );
}

class OrderDraftNotifier extends Notifier<OrderDraft> {
  @override
  OrderDraft build() => const OrderDraft();

  void setMobile(String value) {
    // Changing the number invalidates an auto-filled name, but never a name
    // the salesman typed themselves.
    if (state.customerKnown && normaliseMobile(value) != normaliseMobile(state.mobile)) {
      state = state.copyWith(mobile: value, customerName: '', customerKnown: false);
      return;
    }
    state = state.copyWith(mobile: value);
  }

  void setCustomerName(String value) =>
      state = state.copyWith(customerName: value);

  void applyKnownCustomer(Customer customer) => state = state.copyWith(
        mobile: customer.mobile,
        customerName: customer.name,
        customerKnown: true,
      );

  void setQty(Product product, int qty) {
    final clamped = qty < 0 ? 0 : qty;
    final existing = state.lines[product.id];
    if ((existing?.qtyBoxes ?? 0) == clamped) return;

    final lines = Map<int, DraftLine>.of(state.lines);
    var boxes = state.totalBoxes;
    var value = state.totalValuePaise;

    if (existing != null) {
      boxes -= existing.qtyBoxes;
      value -= existing.lineTotalPaise;
    }
    if (clamped == 0) {
      lines.remove(product.id);
    } else {
      final line = DraftLine(product: product, qtyBoxes: clamped);
      lines[product.id] = line;
      boxes += clamped;
      value += line.lineTotalPaise;
    }

    state = state.copyWith(
      lines: lines,
      totalBoxes: boxes,
      totalValuePaise: value,
    );
  }

  void increment(Product product) =>
      setQty(product, state.qtyFor(product.id) + 1);

  void decrement(Product product) =>
      setQty(product, state.qtyFor(product.id) - 1);

  void clearLines() => state = state.copyWith(
        lines: const {},
        totalBoxes: 0,
        totalValuePaise: 0,
      );

  /// Save-and-next. Wipes everything — number, name and quantities — because
  /// the next screen the salesman sees must be a blank order, not the last
  /// one with fields to clear by hand.
  void reset() => state = const OrderDraft();

  /// Loads an existing order back into the draft so Today's Orders can edit it.
  void loadFrom(BookedOrder order, Map<int, Product> catalogue) {
    final lines = <int, DraftLine>{};
    var boxes = 0;
    var value = 0;
    for (final line in order.lines) {
      final product = catalogue[line.productId];
      if (product == null) continue; // product retired since booking
      lines[product.id] = DraftLine(product: product, qtyBoxes: line.qtyBoxes);
      boxes += line.qtyBoxes;
      value += product.boxPricePaise * line.qtyBoxes;
    }
    state = OrderDraft(
      mobile: order.customerMobile,
      customerName: order.customerName,
      customerKnown: true,
      lines: lines,
      totalBoxes: boxes,
      totalValuePaise: value,
    );
  }
}

final orderDraftProvider =
    NotifierProvider<OrderDraftNotifier, OrderDraft>(OrderDraftNotifier.new);
