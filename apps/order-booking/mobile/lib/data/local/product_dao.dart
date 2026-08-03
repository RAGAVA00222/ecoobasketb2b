import 'package:sqflite/sqflite.dart';

import '../models/product.dart';
import 'app_database.dart';

class ProductDao {
  ProductDao(this._app);

  final AppDatabase _app;
  Database get _db => _app.db;

  /// Loaded once into memory at startup. A distributor's live range is a few
  /// hundred SKUs — small enough that keeping it in a Dart list makes search
  /// a synchronous filter instead of a query per keystroke.
  Future<List<Product>> loadActive() async {
    final rows = await _db.query(
      'products',
      where: 'active = 1',
      orderBy: 'sort_order ASC, name ASC',
    );
    return rows.map(Product.fromRow).toList(growable: false);
  }

  Future<void> upsertAll(List<Product> products) async {
    if (products.isEmpty) return;
    final batch = _db.batch();
    for (final product in products) {
      batch.insert('products', product.toRow(),
          conflictAlgorithm: ConflictAlgorithm.replace);
    }
    await batch.commit(noResult: true);
  }

  /// The high-water mark for delta sync, as an ISO timestamp the API accepts.
  Future<DateTime?> latestUpdatedAt() async {
    final rows = await _db.rawQuery('SELECT MAX(updated_at) AS m FROM products');
    final value = rows.first['m'] as int?;
    return value == null
        ? null
        : DateTime.fromMillisecondsSinceEpoch(value, isUtc: true);
  }

  Future<int> count() async =>
      Sqflite.firstIntValue(
          await _db.rawQuery('SELECT COUNT(*) FROM products')) ??
      0;
}
