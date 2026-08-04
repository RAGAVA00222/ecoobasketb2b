import 'package:flutter/foundation.dart';

@immutable
class Product {
  const Product({
    required this.id,
    required this.sku,
    required this.name,
    required this.mrpPaise,
    required this.boxPricePaise,
    this.brand = '',
    this.unitsPerBox = 1,
    this.imageUrl,
    this.active = true,
    this.sortOrder = 0,
    required this.updatedAt,
    required this.searchIndex,
  });

  final int id;
  final String sku;
  final String name;

  /// The supplier. Shown on the card because the same product name recurs at
  /// several pack sizes across brands.
  final String brand;
  final String? imageUrl;

  /// Per retail unit. 0 means the price list left it blank — the card hides
  /// the MRP chip rather than showing a false ₹0.
  final int mrpPaise;

  /// Retail units inside one box. This is what tells "Milk Classic ₹10 x120"
  /// apart from "Milk Classic ₹20 x60" in a list.
  final int unitsPerBox;
  final int boxPricePaise;
  final bool active;
  final int sortOrder;
  final DateTime updatedAt;

  /// Lowercased name + sku, computed once at load. Search runs on every
  /// keystroke against every product, so the per-keystroke work has to be a
  /// plain `contains` on an already-normalised string — no toLowerCase() in
  /// the hot loop.
  final String searchIndex;

  /// What one retail unit costs the shop. Derived, never stored: it is
  /// box price / pack size, and a stored third copy would drift.
  int get unitPricePaise =>
      unitsPerBox <= 0 ? 0 : (boxPricePaise / unitsPerBox).round();

  bool get hasMrp => mrpPaise > 0;

  static String buildSearchIndex(String name, String sku, [String brand = '']) =>
      '${name.toLowerCase()} ${brand.toLowerCase()} ${sku.toLowerCase()}';

  factory Product.fromApi(Map<String, dynamic> json) {
    final name = json['name'] as String;
    final sku = json['sku'] as String;
    final brand = json['brand'] as String? ?? '';
    return Product(
      id: json['id'] as int,
      sku: sku,
      name: name,
      brand: brand,
      imageUrl: json['image_url'] as String?,
      mrpPaise: json['mrp_paise'] as int,
      unitsPerBox: json['units_per_box'] as int? ?? 1,
      boxPricePaise: json['box_price_paise'] as int,
      active: json['active'] as bool? ?? true,
      sortOrder: json['sort_order'] as int? ?? 0,
      updatedAt: DateTime.parse(json['updated_at'] as String).toUtc(),
      searchIndex: buildSearchIndex(name, sku, brand),
    );
  }

  factory Product.fromRow(Map<String, Object?> row) {
    final name = row['name'] as String;
    final sku = row['sku'] as String;
    final brand = row['brand'] as String? ?? '';
    return Product(
      id: row['id'] as int,
      sku: sku,
      name: name,
      brand: brand,
      imageUrl: row['image_url'] as String?,
      mrpPaise: row['mrp_paise'] as int,
      unitsPerBox: (row['units_per_box'] as int?) ?? 1,
      boxPricePaise: row['box_price_paise'] as int,
      active: (row['active'] as int) == 1,
      sortOrder: row['sort_order'] as int,
      updatedAt:
          DateTime.fromMillisecondsSinceEpoch(row['updated_at'] as int, isUtc: true),
      searchIndex:
          row['search_index'] as String? ?? buildSearchIndex(name, sku, brand),
    );
  }

  Map<String, Object?> toRow() => {
        'id': id,
        'sku': sku,
        'name': name,
        'brand': brand,
        'image_url': imageUrl,
        'mrp_paise': mrpPaise,
        'units_per_box': unitsPerBox,
        'box_price_paise': boxPricePaise,
        'active': active ? 1 : 0,
        'sort_order': sortOrder,
        'updated_at': updatedAt.millisecondsSinceEpoch,
        'search_index': searchIndex,
      };
}
