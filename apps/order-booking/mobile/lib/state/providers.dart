import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/local/app_database.dart';
import '../data/local/customer_dao.dart';
import '../data/local/order_dao.dart';
import '../data/local/product_dao.dart';
import '../data/models/customer.dart';
import '../data/models/order.dart';
import '../data/models/product.dart';
import '../data/remote/api_client.dart';
import '../data/sync/sync_service.dart';
import 'order_draft.dart';
import 'product_search.dart';

/// Overridden in main() once the database is open, so no screen ever has to
/// wait on an async database handle mid-render.
final appDatabaseProvider = Provider<AppDatabase>(
  (ref) => throw UnimplementedError('appDatabaseProvider must be overridden'),
);

final appConfigProvider = Provider<AppConfig>(
  (ref) => throw UnimplementedError('appConfigProvider must be overridden'),
);

class AppConfig {
  const AppConfig({required this.apiBaseUrl, required this.salesmanCode});
  final String apiBaseUrl;
  final String salesmanCode;

  static const metaBaseUrl = 'api_base_url';
  static const metaSalesmanCode = 'salesman_code';
  static const defaultBaseUrl = String.fromEnvironment(
    'ECOO_API_BASE_URL',
    defaultValue: 'https://orders.ecoobasketb2b.com',
  );
}

final productDaoProvider =
    Provider<ProductDao>((ref) => ProductDao(ref.watch(appDatabaseProvider)));
final customerDaoProvider =
    Provider<CustomerDao>((ref) => CustomerDao(ref.watch(appDatabaseProvider)));
final orderDaoProvider =
    Provider<OrderDao>((ref) => OrderDao(ref.watch(appDatabaseProvider)));

final apiClientProvider = Provider<ApiClient>((ref) {
  final client = ApiClient(baseUrl: ref.watch(appConfigProvider).apiBaseUrl);
  ref.onDispose(client.dispose);
  return client;
});

final syncServiceProvider = Provider<SyncService>((ref) {
  final service = SyncService(
    api: ref.watch(apiClientProvider),
    products: ref.watch(productDaoProvider),
    customers: ref.watch(customerDaoProvider),
    orders: ref.watch(orderDaoProvider),
  );
  ref.onDispose(service.dispose);
  return service;
});

final syncStateProvider = StreamProvider<SyncState>((ref) {
  final service = ref.watch(syncServiceProvider);
  return service.stream;
});

/// Bumped after every local write. Dashboard, Today's Orders and Reports all
/// watch it, so one save refreshes all three without any of them polling.
final ordersRevisionProvider = StateProvider<int>((ref) => 0);

// ---------------------------------------------------------------------------
// Catalogue
// ---------------------------------------------------------------------------

/// The whole active catalogue, in memory. A few hundred rows is nothing to
/// hold, and holding it is what makes search feel like it has no latency.
class CatalogueNotifier extends AsyncNotifier<List<Product>> {
  @override
  Future<List<Product>> build() => ref.watch(productDaoProvider).loadActive();

  Future<void> reload() async {
    state = await AsyncValue.guard(
      () => ref.read(productDaoProvider).loadActive(),
    );
  }
}

final catalogueProvider =
    AsyncNotifierProvider<CatalogueNotifier, List<Product>>(
        CatalogueNotifier.new);

final catalogueByIdProvider = Provider<Map<int, Product>>((ref) {
  final products = ref.watch(catalogueProvider).valueOrNull ?? const <Product>[];
  return {for (final product in products) product.id: product};
});

final productQueryProvider = StateProvider<String>((ref) => '');

/// Search results. Pure function of (catalogue, query) — Riverpod caches it,
/// so an unchanged query costs nothing on rebuild.
final searchResultsProvider = Provider<List<Product>>((ref) {
  final catalogue = ref.watch(catalogueProvider).valueOrNull ?? const <Product>[];
  final query = ref.watch(productQueryProvider);
  return searchProducts(catalogue, query);
});

// ---------------------------------------------------------------------------
// Customer auto-fill
// ---------------------------------------------------------------------------

/// Local-first lookup: SQLite answers, and the server is only asked when the
/// device has never seen this shop. The UI never blocks on either.
final customerLookupProvider =
    FutureProvider.family<Customer?, String>((ref, mobile) async {
  final local = await ref.watch(customerDaoProvider).findByMobile(mobile);
  if (local != null) return local;

  final sync = ref.watch(syncServiceProvider);
  if (sync.state.connection == NetworkStatus.offline) return null;
  try {
    final remote = await ref.watch(apiClientProvider).lookupCustomer(mobile);
    if (remote != null) {
      await ref.watch(customerDaoProvider).upsert(remote);
    }
    return remote;
  } catch (_) {
    // A shop we cannot look up is just a shop whose name gets typed. Never
    // let this surface as an error in the middle of a booking.
    return null;
  }
});

final customerSuggestionsProvider =
    FutureProvider.family<List<Customer>, String>((ref, term) {
  if (term.trim().length < 2) return Future.value(const <Customer>[]);
  return ref.watch(customerDaoProvider).search(term);
});

// ---------------------------------------------------------------------------
// Saving
// ---------------------------------------------------------------------------

class OrderRepository {
  OrderRepository(this._ref);
  final Ref _ref;

  /// The save path, and the only thing on it: write the order and the
  /// customer to SQLite, then hand off to sync. No network, no dialog, no
  /// spinner — the order is durable before the button finishes animating.
  Future<BookedOrder> saveDraft(OrderDraft draft) async {
    final config = _ref.read(appConfigProvider);
    final order = draft.toBookedOrder(salesmanCode: config.salesmanCode);

    final rowId = await _ref.read(orderDaoProvider).save(order);
    await _ref.read(customerDaoProvider).upsert(
          Customer(
            mobile: order.customerMobile,
            name: order.customerName,
            updatedAt: DateTime.now().toUtc(),
          ),
        );

    _ref.read(ordersRevisionProvider.notifier).update((rev) => rev + 1);
    // Fire and forget: sync must never delay the next customer.
    _fireAndForget(_ref.read(syncServiceProvider).noteLocalChange());
    return order.copyWith(rowId: rowId);
  }

  Future<void> updateOrder(int rowId, OrderDraft draft) async {
    final config = _ref.read(appConfigProvider);
    final updated = draft.toBookedOrder(salesmanCode: config.salesmanCode);
    await _ref.read(orderDaoProvider).replaceLines(rowId, updated);
    _ref.read(ordersRevisionProvider.notifier).update((rev) => rev + 1);
    _fireAndForget(_ref.read(syncServiceProvider).noteLocalChange());
  }

  Future<void> deleteOrder(int rowId) async {
    await _ref.read(orderDaoProvider).softDelete(rowId);
    _ref.read(ordersRevisionProvider.notifier).update((rev) => rev + 1);
  }
}

final orderRepositoryProvider =
    Provider<OrderRepository>(OrderRepository.new);

// ---------------------------------------------------------------------------
// Read models
// ---------------------------------------------------------------------------

String todayKey() => dayKey(DateTime.now());

final dayStatsProvider =
    FutureProvider.family<DayStats, String>((ref, day) {
  ref.watch(ordersRevisionProvider);
  return ref.watch(orderDaoProvider).statsFor(day);
});

final ordersOnDayProvider =
    FutureProvider.family<List<BookedOrder>, String>((ref, day) {
  ref.watch(ordersRevisionProvider);
  return ref.watch(orderDaoProvider).ordersOn(day);
});

final orderSearchProvider = StateProvider<String>((ref) => '');

final filteredOrdersProvider =
    FutureProvider.family<List<BookedOrder>, String>((ref, day) {
  ref.watch(ordersRevisionProvider);
  final query = ref.watch(orderSearchProvider);
  return ref.watch(orderDaoProvider).ordersOn(day, query: query);
});

/// Product-wise box totals — this is the load sheet.
final loadSheetProvider =
    FutureProvider.family<List<ProductTotal>, String>((ref, day) {
  ref.watch(ordersRevisionProvider);
  return ref.watch(orderDaoProvider).productTotals(day);
});

final customerTotalsProvider =
    FutureProvider.family<List<CustomerTotal>, String>((ref, day) {
  ref.watch(ordersRevisionProvider);
  return ref.watch(orderDaoProvider).customerTotals(day);
});

/// Starts work we deliberately do not wait for. Sync failures are expected in
/// the field and must never bubble up as an error while a salesman is booking.
void _fireAndForget(Future<void> future) {
  future.catchError((Object _) {});
}
