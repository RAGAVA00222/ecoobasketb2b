import 'package:flutter/foundation.dart';

@immutable
class Product {
  const Product({
    required this.id,
    required this.sku,
    required this.name,
    required this.mrpPaise,
    required this.boxPricePaise,
    this.imageUrl,
    this.active = true,
    this.sortOrder = 0,
    required this.updatedAt,
    required this.searchIndex,
  });

  final int id;
  final String sku;
  final String name;
  final String? imageUrl;
  final int mrpPaise;
  final int boxPricePaise;
  final bool active;
  final int sortOrder;
  final DateTime updatedAt;

  /// Lowercased name + sku, computed once at load. Search runs on every
  /// keystroke against every product, so the per-keystroke work has to be a
  /// plain `contains` on an already-normalised string — no toLowerCase() in
  /// the hot loop.
  final String searchIndex;

  static String buildSearchIndex(String name, String sku) =>
      '${name.toLowerCase()} ${sku.toLowerCase()}';

  factory Product.fromApi(Map<String, dynamic> json) {
    final name = json['name'] as String;
    final sku = json['sku'] as String;
    return Product(
      id: json['id'] as int,
      sku: sku,
      name: name,
      imageUrl: json['image_url'] as String?,
      mrpPaise: json['mrp_paise'] as int,
      boxPricePaise: json['box_price_paise'] as int,
      active: json['active'] as bool? ?? true,
      sortOrder: json['sort_order'] as int? ?? 0,
      updatedAt: DateTime.parse(json['updated_at'] as String).toUtc(),
      searchIndex: buildSearchIndex(name, sku),
    );
  }

  factory Product.fromRow(Map<String, Object?> row) {
    final name = row['name'] as String;
    final sku = row['sku'] as String;
    return Product(
      id: row['id'] as int,
      sku: sku,
      name: name,
      imageUrl: row['image_url'] as String?,
      mrpPaise: row['mrp_paise'] as int,
      boxPricePaise: row['box_price_paise'] as int,
      active: (row['active'] as int) == 1,
      sortOrder: row['sort_order'] as int,
      updatedAt:
          DateTime.fromMillisecondsSinceEpoch(row['updated_at'] as int, isUtc: true),
      searchIndex: row['search_index'] as String? ?? buildSearchIndex(name, sku),
    );
  }

  Map<String, Object?> toRow() => {
        'id': id,
        'sku': sku,
        'name': name,
        'image_url': imageUrl,
        'mrp_paise': mrpPaise,
        'box_price_paise': boxPricePaise,
        'active': active ? 1 : 0,
        'sort_order': sortOrder,
        'updated_at': updatedAt.millisecondsSinceEpoch,
        'search_index': searchIndex,
      };
}
