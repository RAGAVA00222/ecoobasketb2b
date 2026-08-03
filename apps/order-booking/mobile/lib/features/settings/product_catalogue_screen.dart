import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/money.dart';
import '../../state/product_search.dart';
import '../../state/providers.dart';

/// Read-only price list. The salesman can check what a box costs; they cannot
/// change it. Editing lives in the admin API behind an admin key that never
/// ships to a field device — a phone that can rewrite prices is a phone that
/// can invent a discount.
class ProductCatalogueScreen extends ConsumerStatefulWidget {
  const ProductCatalogueScreen({super.key});

  @override
  ConsumerState<ProductCatalogueScreen> createState() =>
      _ProductCatalogueScreenState();
}

class _ProductCatalogueScreenState
    extends ConsumerState<ProductCatalogueScreen> {
  String _query = '';

  @override
  Widget build(BuildContext context) {
    final catalogue =
        ref.watch(catalogueProvider).valueOrNull ?? const [];
    final results = searchProducts(catalogue, _query);

    return Scaffold(
      appBar: AppBar(title: const Text('Product Catalogue')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
            child: TextField(
              onChanged: (value) => setState(() => _query = value),
              decoration: const InputDecoration(
                hintText: 'Search products…',
                prefixIcon: Icon(Icons.search_rounded),
              ),
            ),
          ),
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.fromLTRB(8, 0, 8, 20),
              itemCount: results.length,
              separatorBuilder: (_, __) => const Divider(height: 1),
              itemBuilder: (context, index) {
                final product = results[index];
                return ListTile(
                  leading: SizedBox(
                    width: 44,
                    height: 44,
                    child: product.imageUrl == null || product.imageUrl!.isEmpty
                        ? const Icon(Icons.inventory_2_outlined,
                            color: Color(0xFFA9B6AF))
                        : ClipRRect(
                            borderRadius: BorderRadius.circular(10),
                            child: CachedNetworkImage(
                              imageUrl: product.imageUrl!,
                              fit: BoxFit.cover,
                              memCacheWidth: 132,
                              errorWidget: (_, __, ___) => const Icon(
                                  Icons.inventory_2_outlined,
                                  color: Color(0xFFA9B6AF)),
                            ),
                          ),
                  ),
                  title: Text(
                    product.name,
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                  subtitle: Text(
                    'MRP ${product.mrpPaise.asRupees}  ·  ${product.sku}',
                    style: const TextStyle(fontSize: 12.5),
                  ),
                  trailing: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        product.boxPricePaise.asRupees,
                        style: const TextStyle(
                          fontWeight: FontWeight.w800,
                          fontSize: 15,
                        ),
                      ),
                      const Text(
                        'per box',
                        style: TextStyle(
                            fontSize: 11, color: Color(0xFF6B7A73)),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
