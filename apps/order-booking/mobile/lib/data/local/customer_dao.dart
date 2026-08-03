import 'package:sqflite/sqflite.dart';

import '../../core/mobile_number.dart';
import '../models/customer.dart';
import 'app_database.dart';

class CustomerDao {
  CustomerDao(this._app);

  final AppDatabase _app;
  Database get _db => _app.db;

  /// The auto-fill. One primary-key lookup on the local database — it resolves
  /// before the salesman's thumb leaves the last digit, with no network in the
  /// path, which is the only way this works standing inside a shop.
  Future<Customer?> findByMobile(String rawMobile) async {
    final mobile = normaliseMobile(rawMobile);
    if (mobile.isEmpty) return null;
    final rows = await _db.query('customers',
        where: 'mobile = ?', whereArgs: [mobile], limit: 1);
    return rows.isEmpty ? null : Customer.fromRow(rows.first);
  }

  Future<void> upsert(Customer customer) async {
    await _db.insert(
      'customers',
      customer.toRow(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> upsertAll(List<Customer> customers) async {
    if (customers.isEmpty) return;
    final batch = _db.batch();
    for (final customer in customers) {
      batch.insert('customers', customer.toRow(),
          conflictAlgorithm: ConflictAlgorithm.replace);
    }
    await batch.commit(noResult: true);
  }

  /// Type-ahead over shops already visited, so a salesman who half-remembers
  /// the number can find the shop by name instead.
  Future<List<Customer>> search(String term, {int limit = 8}) async {
    final needle = term.trim().toLowerCase();
    if (needle.isEmpty) return const [];
    final rows = await _db.query(
      'customers',
      where: 'mobile LIKE ? OR LOWER(name) LIKE ?',
      whereArgs: ['$needle%', '%$needle%'],
      orderBy: 'updated_at DESC',
      limit: limit,
    );
    return rows.map(Customer.fromRow).toList(growable: false);
  }

  Future<DateTime?> latestUpdatedAt() async {
    final rows = await _db.rawQuery('SELECT MAX(updated_at) AS m FROM customers');
    final value = rows.first['m'] as int?;
    return value == null
        ? null
        : DateTime.fromMillisecondsSinceEpoch(value, isUtc: true);
  }
}
