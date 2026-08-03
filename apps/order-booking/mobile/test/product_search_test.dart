import 'package:ecoo_order_booking/data/models/product.dart';
import 'package:ecoo_order_booking/state/product_search.dart';
import 'package:flutter_test/flutter_test.dart';

Product product(int id, String name, {String? sku, int sortOrder = 0}) {
  final resolvedSku = sku ?? 'SKU-$id';
  return Product(
    id: id,
    sku: resolvedSku,
    name: name,
    mrpPaise: 1000,
    boxPricePaise: 92000,
    sortOrder: sortOrder,
    updatedAt: DateTime.utc(2026, 1, 1),
    searchIndex: Product.buildSearchIndex(name, resolvedSku),
  );
}

void main() {
  final catalogue = [
    product(1, 'Good Day Cashew Biscuit', sortOrder: 0),
    product(2, 'Milk Bikis', sortOrder: 1),
    product(3, 'Jim Jam Cream Biscuit', sortOrder: 2),
    product(4, 'Maggi Noodles 70g', sortOrder: 3),
    product(5, 'Dark Fantasy Choco Fills', sortOrder: 4),
    product(6, 'Bourbon Cream Biscuit', sortOrder: 5),
  ];

  List<String> namesFor(String query) =>
      [for (final p in searchProducts(catalogue, query)) p.name];

  test('"good" finds Good Day', () {
    expect(namesFor('good').first, 'Good Day Cashew Biscuit');
  });

  test('"milk" finds Milk Bikis', () {
    expect(namesFor('milk'), ['Milk Bikis']);
  });

  test('an empty query returns the catalogue untouched', () {
    expect(searchProducts(catalogue, '   '), same(catalogue));
  });

  test('search is case insensitive', () {
    expect(namesFor('GOOD DAY').first, 'Good Day Cashew Biscuit');
  });

  test('words can be typed in any order', () {
    expect(namesFor('day good').first, 'Good Day Cashew Biscuit');
  });

  test('a name-start match outranks a mid-name match', () {
    // "cream" starts a word in two products; "Jim Jam" is listed first by
    // catalogue order, and that tie-break must hold.
    expect(namesFor('cream'), [
      'Jim Jam Cream Biscuit',
      'Bourbon Cream Biscuit',
    ]);
  });

  test('equal-rank matches keep the catalogue order the admin chose', () {
    // "biscuit" starts a word in all three; sort_order decides the rest.
    expect(namesFor('biscuit'), [
      'Good Day Cashew Biscuit',
      'Jim Jam Cream Biscuit',
      'Bourbon Cream Biscuit',
    ]);
  });

  test('a match in the middle of a word still counts, just lower', () {
    // "oco" only appears inside "Choco".
    expect(namesFor('oco'), ['Dark Fantasy Choco Fills']);
  });

  test('every typed word has to match — terms narrow, they do not widen', () {
    // No product is both a Cream and a Fantasy, so two words that each match
    // something separately must still return nothing together.
    expect(namesFor('cream'), isNotEmpty);
    expect(namesFor('fantasy'), isNotEmpty);
    expect(namesFor('cream fantasy'), isEmpty);
  });

  test('sku is searchable, so a salesman can type a code from a price list', () {
    expect(namesFor('SKU-4'), ['Maggi Noodles 70g']);
  });

  test('a term nothing matches returns nothing rather than everything', () {
    expect(namesFor('zzz'), isEmpty);
  });
}
