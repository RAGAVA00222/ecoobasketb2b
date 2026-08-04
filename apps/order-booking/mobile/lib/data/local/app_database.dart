import 'package:path/path.dart' as p;
import 'package:sqflite/sqflite.dart';

/// The device database is the app's source of truth. Every screen reads from
/// here; the network is only ever a background job that fills it and drains
/// the outbox. A salesman in a basement godown with no signal sees no
/// difference in behaviour at all.
class AppDatabase {
  AppDatabase._(this.db);

  final Database db;

  static const _fileName = 'ecoo_orders.db';
  static const _version = 2;

  static Future<AppDatabase> open({String? path}) async {
    final dbPath = path ?? p.join(await getDatabasesPath(), _fileName);
    final db = await openDatabase(
      dbPath,
      version: _version,
      onConfigure: (db) async {
        await db.execute('PRAGMA foreign_keys = ON');
      },
      onCreate: _createSchema,
      onUpgrade: _migrate,
      onOpen: (db) async {
        // WAL keeps the "save order" write from blocking behind a background
        // catalogue sync, which is the difference between a 40ms save and a
        // visible stutter.
        await db.rawQuery('PRAGMA journal_mode = WAL');
        await db.execute('PRAGMA synchronous = NORMAL');
      },
    );
    return AppDatabase._(db);
  }

  static Future<void> _createSchema(Database db, int version) async {
    final batch = db.batch();

    batch.execute('''
      CREATE TABLE products (
        id INTEGER PRIMARY KEY,
        sku TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        brand TEXT NOT NULL DEFAULT '',
        image_url TEXT,
        mrp_paise INTEGER NOT NULL,
        units_per_box INTEGER NOT NULL DEFAULT 1,
        box_price_paise INTEGER NOT NULL,
        active INTEGER NOT NULL DEFAULT 1,
        sort_order INTEGER NOT NULL DEFAULT 0,
        updated_at INTEGER NOT NULL,
        search_index TEXT NOT NULL
      )
    ''');
    batch.execute('CREATE INDEX idx_products_active ON products(active, sort_order)');

    // Mobile is the primary key: auto-fill is then a single PK lookup, which
    // is what keeps it instant while the salesman is still typing.
    batch.execute('''
      CREATE TABLE customers (
        mobile TEXT PRIMARY KEY,
        id INTEGER,
        name TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      )
    ''');

    batch.execute('''
      CREATE TABLE orders (
        row_id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_uuid TEXT NOT NULL UNIQUE,
        customer_mobile TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        salesman_code TEXT NOT NULL,
        booked_at INTEGER NOT NULL,
        order_date TEXT NOT NULL,
        total_products INTEGER NOT NULL,
        total_boxes INTEGER NOT NULL,
        total_value_paise INTEGER NOT NULL,
        sync_status INTEGER NOT NULL DEFAULT 0,
        sync_error TEXT,
        server_id INTEGER,
        is_deleted INTEGER NOT NULL DEFAULT 0
      )
    ''');
    batch.execute(
        'CREATE INDEX idx_orders_day ON orders(order_date, is_deleted)');
    batch.execute(
        'CREATE INDEX idx_orders_outbox ON orders(sync_status, is_deleted)');
    // Powers the one-tap repeat: "what did this shop order last time?"
    batch.execute('CREATE INDEX idx_orders_customer '
        'ON orders(customer_mobile, is_deleted, booked_at)');

    batch.execute('''
      CREATE TABLE order_lines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_row_id INTEGER NOT NULL REFERENCES orders(row_id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        mrp_paise INTEGER NOT NULL,
        box_price_paise INTEGER NOT NULL,
        qty_boxes INTEGER NOT NULL,
        line_total_paise INTEGER NOT NULL
      )
    ''');
    batch.execute(
        'CREATE INDEX idx_order_lines_order ON order_lines(order_row_id)');

    batch.execute('''
      CREATE TABLE meta (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    ''');

    await batch.commit(noResult: true);
  }

  /// v1 -> v2 adds brand and pack size to the catalogue.
  ///
  /// Additive columns with defaults, so an upgrading device keeps every order
  /// it has already booked. The next catalogue sync refills the new columns;
  /// until then products simply show no brand, which is cosmetic.
  static Future<void> _migrate(Database db, int from, int to) async {
    if (from < 2) {
      await db.execute(
          "ALTER TABLE products ADD COLUMN brand TEXT NOT NULL DEFAULT ''");
      await db.execute(
          'ALTER TABLE products ADD COLUMN units_per_box INTEGER NOT NULL DEFAULT 1');
      await db.execute('CREATE INDEX IF NOT EXISTS idx_orders_customer '
          'ON orders(customer_mobile, is_deleted, booked_at)');
      // Force a full catalogue re-pull so the new columns are populated.
      await db.delete('products');
    }
  }

  Future<String?> readMeta(String key) async {
    final rows = await db.query('meta',
        columns: ['value'], where: 'key = ?', whereArgs: [key], limit: 1);
    return rows.isEmpty ? null : rows.first['value'] as String;
  }

  Future<void> writeMeta(String key, String value) async {
    await db.insert('meta', {'key': key, 'value': value},
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<void> close() => db.close();
}
