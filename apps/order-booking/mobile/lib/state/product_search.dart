import '../data/models/product.dart';

/// Product search.
///
/// The whole active catalogue is already in memory and every product carries a
/// pre-lowercased `searchIndex`, so a keystroke costs one linear pass with no
/// allocation per product and no database round trip. At a few hundred SKUs
/// that is microseconds, which is what "results appear as you type" actually
/// requires — a debounce would be slower and would feel laggier.
///
/// Matching rules, in the order a salesman expects:
///   1. name starts with the query      "good"  -> Good Day first
///   2. a word inside the name starts with it   "milk"  -> Milk Bikis
///   3. the query appears anywhere (incl. SKU)
/// Multiple words must all match, in any order: "good day" and "day good"
/// both find Good Day.
List<Product> searchProducts(List<Product> catalogue, String query) {
  final needle = query.trim().toLowerCase();
  if (needle.isEmpty) return catalogue;

  final terms = needle.split(RegExp(r'\s+'));
  final matches = <_Ranked>[];

  for (final product in catalogue) {
    final index = product.searchIndex;
    var rank = 0;
    var matchedAll = true;

    for (final term in terms) {
      final at = index.indexOf(term);
      if (at < 0) {
        matchedAll = false;
        break;
      }
      // Best (lowest) rank wins: 0 = starts the name, 1 = starts a word,
      // 2 = matches somewhere in the middle or in the SKU.
      final termRank = at == 0
          ? 0
          : (index.codeUnitAt(at - 1) == _space ? 1 : 2);
      if (termRank > rank) rank = termRank;
    }

    if (matchedAll) matches.add(_Ranked(product, rank));
  }

  matches.sort((a, b) {
    final byRank = a.rank.compareTo(b.rank);
    if (byRank != 0) return byRank;
    // Ties keep the admin's catalogue order, so the fast-moving lines the
    // distributor put at the top stay at the top.
    final byOrder = a.product.sortOrder.compareTo(b.product.sortOrder);
    return byOrder != 0 ? byOrder : a.product.name.compareTo(b.product.name);
  });

  return [for (final match in matches) match.product];
}

const int _space = 32;

class _Ranked {
  const _Ranked(this.product, this.rank);
  final Product product;
  final int rank;
}
