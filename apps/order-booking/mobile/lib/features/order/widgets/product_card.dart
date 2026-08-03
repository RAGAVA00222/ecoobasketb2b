import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/money.dart';
import '../../../core/theme.dart';
import '../../../data/models/product.dart';
import '../../../state/order_draft.dart';

/// One product, one card: image, name, MRP, box price, a stepper and the line
/// total. Everything the salesman needs to quote a shop without leaving the
/// list.
class ProductCard extends ConsumerWidget {
  const ProductCard({super.key, required this.product});

  final Product product;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Watching only this product's quantity is what keeps a `+` tap to a
    // single-card repaint instead of a whole-list rebuild.
    final qty = ref.watch(
      orderDraftProvider.select((draft) => draft.qtyFor(product.id)),
    );
    final selected = qty > 0;

    return AppCard(
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 120),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(AppTheme.cardRadius),
          border: Border.all(
            color: selected ? AppTheme.green : Colors.transparent,
            width: 2,
          ),
        ),
        padding: const EdgeInsets.all(12),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _ProductImage(url: product.imageUrl),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    product.name,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 16.5,
                      fontWeight: FontWeight.w700,
                      height: 1.2,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Row(
                    children: [
                      Text(
                        'MRP ${product.mrpPaise.asRupees}',
                        style: const TextStyle(
                          fontSize: 13,
                          color: Color(0xFF6B7A73),
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(width: 10),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppTheme.green.withValues(alpha: 0.10),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          'Box ${product.boxPricePaise.asRupees}',
                          style: const TextStyle(
                            fontSize: 13,
                            color: AppTheme.greenDark,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      _QtyStepper(product: product, qty: qty),
                      const Spacer(),
                      if (selected)
                        Text(
                          (product.boxPricePaise * qty).asRupees,
                          style: const TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.greenDark,
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _QtyStepper extends ConsumerWidget {
  const _QtyStepper({required this.product, required this.qty});

  final Product product;
  final int qty;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final draft = ref.read(orderDraftProvider.notifier);

    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFF2F5F3),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _StepButton(
            icon: Icons.remove_rounded,
            enabled: qty > 0,
            onTap: () {
              HapticFeedback.selectionClick();
              draft.decrement(product);
            },
          ),
          // Tapping the number opens a keypad — 40 boxes is 40 taps otherwise.
          InkWell(
            onTap: () => _promptForQuantity(context, ref),
            borderRadius: BorderRadius.circular(8),
            child: SizedBox(
              width: 46,
              height: 44,
              child: Center(
                child: Text(
                  '$qty',
                  style: TextStyle(
                    fontSize: 19,
                    fontWeight: FontWeight.w800,
                    color: qty > 0 ? AppTheme.ink : const Color(0xFF9AA8A1),
                  ),
                ),
              ),
            ),
          ),
          _StepButton(
            icon: Icons.add_rounded,
            enabled: true,
            onTap: () {
              HapticFeedback.selectionClick();
              draft.increment(product);
            },
          ),
        ],
      ),
    );
  }

  Future<void> _promptForQuantity(BuildContext context, WidgetRef ref) async {
    final controller = TextEditingController(text: qty > 0 ? '$qty' : '');
    final entered = await showDialog<int>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(product.name),
        content: TextField(
          controller: controller,
          autofocus: true,
          keyboardType: TextInputType.number,
          inputFormatters: [FilteringTextInputFormatter.digitsOnly],
          style: const TextStyle(fontSize: 30, fontWeight: FontWeight.w700),
          decoration: const InputDecoration(labelText: 'Boxes'),
          onSubmitted: (value) =>
              Navigator.of(context).pop(int.tryParse(value) ?? 0),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(context)
                .pop(int.tryParse(controller.text) ?? 0),
            child: const Text('Set'),
          ),
        ],
      ),
    );
    if (entered != null) {
      ref.read(orderDraftProvider.notifier).setQty(product, entered);
    }
  }
}

class _StepButton extends StatelessWidget {
  const _StepButton({
    required this.icon,
    required this.enabled,
    required this.onTap,
  });

  final IconData icon;
  final bool enabled;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(14),
      onTap: enabled ? onTap : null,
      child: SizedBox(
        // 44dp square. These get pressed hundreds of times a day, often with
        // one hand while the other is holding a crate.
        width: 44,
        height: 44,
        child: Icon(
          icon,
          size: 22,
          color: enabled ? AppTheme.greenDark : const Color(0xFFB6C1BB),
        ),
      ),
    );
  }
}

class _ProductImage extends StatelessWidget {
  const _ProductImage({this.url});

  final String? url;

  @override
  Widget build(BuildContext context) {
    const size = 72.0;
    final placeholder = Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: const Color(0xFFF2F5F3),
        borderRadius: BorderRadius.circular(14),
      ),
      child: const Icon(Icons.inventory_2_outlined,
          color: Color(0xFFA9B6AF), size: 26),
    );

    if (url == null || url!.isEmpty) return placeholder;

    return ClipRRect(
      borderRadius: BorderRadius.circular(14),
      child: CachedNetworkImage(
        imageUrl: url!,
        width: size,
        height: size,
        fit: BoxFit.cover,
        // Decoded at display size, not source size: a 1000px pack shot
        // decoded full-size is megabytes of RAM per card on a cheap phone.
        memCacheWidth: 216,
        fadeInDuration: const Duration(milliseconds: 120),
        placeholder: (_, __) => placeholder,
        errorWidget: (_, __, ___) => placeholder,
      ),
    );
  }
}
