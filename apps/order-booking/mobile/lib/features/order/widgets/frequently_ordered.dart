import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/money.dart';
import '../../../core/theme.dart';
import '../../../data/models/order.dart';
import '../../../state/order_draft.dart';
import '../../../state/providers.dart';

/// What this shop bought last time, with one tap to book it again.
///
/// FMCG repeat visits are overwhelmingly the same basket with adjusted
/// quantities. Turning that into one tap plus a few `+`s is the single biggest
/// saving available against the 30–45 second target — it removes six searches.
///
/// Appears only once a known customer has loaded, and vanishes again when the
/// number is cleared, so it never occupies space on a new shop's first order.
class FrequentlyOrdered extends ConsumerWidget {
  const FrequentlyOrdered({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final mobile = ref.watch(
      orderDraftProvider.select(
        (draft) => draft.customerKnown ? draft.mobile : '',
      ),
    );
    if (mobile.isEmpty) return const SizedBox.shrink();

    final previous = ref.watch(lastOrderForProvider(mobile)).valueOrNull;
    if (previous == null || previous.lines.isEmpty) {
      return const SizedBox.shrink();
    }

    return Padding(
      padding: const EdgeInsets.only(top: 12),
      child: AppCard(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(14, 12, 14, 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.history_rounded,
                      size: 17, color: AppTheme.blue),
                  const SizedBox(width: 7),
                  const Expanded(
                    child: Text(
                      'Frequently Ordered',
                      style: TextStyle(
                        fontSize: 14.5,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                  Text(
                    '${previous.totalBoxes} boxes · '
                    '${previous.totalValuePaise.asRupees}',
                    style: const TextStyle(
                      fontSize: 12,
                      color: Color(0xFF6B7A73),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              // Horizontal so a long previous order never pushes the product
              // list off screen.
              SizedBox(
                height: 34,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: previous.lines.length,
                  separatorBuilder: (_, __) => const SizedBox(width: 7),
                  itemBuilder: (context, index) {
                    final line = previous.lines[index];
                    return _LineChip(line: line);
                  },
                ),
              ),
              const SizedBox(height: 10),
              SizedBox(
                width: double.infinity,
                height: 44,
                child: FilledButton.tonalIcon(
                  onPressed: () => _repeat(context, ref, previous),
                  icon: const Icon(Icons.replay_rounded, size: 19),
                  label: const Text(
                    'Repeat last order',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _repeat(BuildContext context, WidgetRef ref, BookedOrder previous) {
    HapticFeedback.mediumImpact();
    final applied = ref
        .read(orderDraftProvider.notifier)
        .applyPreviousQuantities(previous, ref.read(catalogueByIdProvider));

    final skipped = previous.lines.length - applied;
    final messenger = ScaffoldMessenger.of(context)..hideCurrentSnackBar();
    messenger.showSnackBar(
      SnackBar(
        duration: const Duration(milliseconds: 1600),
        content: Text(
          applied == 0
              ? 'Already added'
              : '$applied product(s) added'
                  '${skipped > 0 ? ' · $skipped no longer stocked' : ''}',
        ),
      ),
    );
  }
}

class _LineChip extends StatelessWidget {
  const _LineChip({required this.line});

  final OrderLine line;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: const Color(0xFFF2F5F3),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            line.productName,
            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
          ),
          const SizedBox(width: 6),
          Text(
            '${line.qtyBoxes}',
            style: const TextStyle(
              fontSize: 13.5,
              fontWeight: FontWeight.w800,
              color: AppTheme.greenDark,
            ),
          ),
        ],
      ),
    );
  }
}
