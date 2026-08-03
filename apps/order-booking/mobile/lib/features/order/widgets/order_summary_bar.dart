import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/money.dart';
import '../../../core/theme.dart';
import '../../../state/order_draft.dart';

/// Live order total pinned to the bottom of the screen, with the save button
/// directly under it. The salesman can quote the shop the running figure
/// without scrolling anywhere.
class OrderSummaryBar extends ConsumerWidget {
  const OrderSummaryBar({
    super.key,
    required this.onSave,
    this.saveLabel = 'Save Order & Next Customer',
    this.saving = false,
  });

  final Future<void> Function() onSave;
  final String saveLabel;
  final bool saving;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final draft = ref.watch(orderDraftProvider);

    return Container(
      padding: EdgeInsets.fromLTRB(
        16,
        12,
        16,
        12 + MediaQuery.of(context).padding.bottom,
      ),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: Color(0xFFE6EBE8))),
        boxShadow: [
          BoxShadow(
            color: Color(0x14000000),
            blurRadius: 18,
            offset: Offset(0, -4),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              _Metric(label: 'Products', value: '${draft.totalProducts}'),
              _Metric(label: 'Boxes', value: '${draft.totalBoxes}'),
              const Spacer(),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  const Text(
                    'Grand Total',
                    style: TextStyle(
                      fontSize: 12,
                      color: Color(0xFF6B7A73),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    draft.totalValuePaise.asRupees,
                    style: const TextStyle(
                      fontSize: 25,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.greenDark,
                      height: 1.1,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),
          SizedBox(
            height: 62,
            child: FilledButton.icon(
              // Disabled until the order is bookable, which removes the whole
              // class of "saved an empty order" mistakes without a dialog.
              onPressed: draft.canSave && !saving ? onSave : null,
              icon: saving
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2.4,
                        color: Colors.white,
                      ),
                    )
                  : const Icon(Icons.save_rounded, size: 24),
              label: Text(
                saveLabel,
                style: const TextStyle(fontSize: 17.5, fontWeight: FontWeight.w800),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Metric extends StatelessWidget {
  const _Metric({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: const TextStyle(
              fontSize: 12,
              color: Color(0xFF6B7A73),
              fontWeight: FontWeight.w600,
            ),
          ),
          Text(
            value,
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
          ),
        ],
      ),
    );
  }
}
