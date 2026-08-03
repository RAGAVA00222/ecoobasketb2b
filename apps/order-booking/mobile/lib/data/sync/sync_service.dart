import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/foundation.dart';

import '../local/customer_dao.dart';
import '../local/order_dao.dart';
import '../local/product_dao.dart';
import '../remote/api_client.dart';

enum NetworkStatus { offline, online }

@immutable
class SyncState {
  const SyncState({
    this.connection = NetworkStatus.offline,
    this.pending = 0,
    this.syncing = false,
    this.lastSyncedAt,
    this.lastError,
  });

  final NetworkStatus connection;
  final int pending;
  final bool syncing;
  final DateTime? lastSyncedAt;
  final String? lastError;

  /// What the salesman sees in the status pill. Three states, no jargon:
  /// Offline / Pending Sync / Synced.
  String get label {
    if (syncing) return 'Syncing…';
    if (connection == NetworkStatus.offline) return 'Offline';
    if (pending > 0) return 'Pending sync · $pending';
    return 'Synced';
  }

  SyncState copyWith({
    NetworkStatus? connection,
    int? pending,
    bool? syncing,
    DateTime? lastSyncedAt,
    String? lastError,
    bool clearError = false,
  }) =>
      SyncState(
        connection: connection ?? this.connection,
        pending: pending ?? this.pending,
        syncing: syncing ?? this.syncing,
        lastSyncedAt: lastSyncedAt ?? this.lastSyncedAt,
        lastError: clearError ? null : (lastError ?? this.lastError),
      );
}

/// Background sync. Nothing in here is ever on the salesman's critical path:
/// orders are already durable in SQLite before this class hears about them.
class SyncService {
  SyncService({
    required ApiClient api,
    required ProductDao products,
    required CustomerDao customers,
    required OrderDao orders,
    Connectivity? connectivity,
  })  : _api = api,
        _products = products,
        _customers = customers,
        _orders = orders,
        _connectivity = connectivity ?? Connectivity();

  final ApiClient _api;
  final ProductDao _products;
  final CustomerDao _customers;
  final OrderDao _orders;
  final Connectivity _connectivity;

  final _controller = StreamController<SyncState>.broadcast();
  Stream<SyncState> get stream => _controller.stream;

  SyncState _state = const SyncState();
  SyncState get state => _state;

  StreamSubscription<List<ConnectivityResult>>? _connectivitySub;
  Timer? _ticker;
  bool _running = false;

  Future<void> start() async {
    await _refreshPending();
    final initial = await _connectivity.checkConnectivity();
    _emit(_state.copyWith(connection: _classify(initial)));

    _connectivitySub =
        _connectivity.onConnectivityChanged.listen((results) async {
      final connection = _classify(results);
      _emit(_state.copyWith(connection: connection));
      // Coming back into signal is the moment that matters — drain the outbox
      // immediately rather than waiting for the next tick.
      if (connection == NetworkStatus.online) {
        unawaited(syncNow());
      }
    });

    // A slow safety net for the case where connectivity events are missed,
    // which Android does do when the radio flaps.
    _ticker = Timer.periodic(const Duration(minutes: 3), (_) => syncNow());
    unawaited(syncNow());
  }

  NetworkStatus _classify(List<ConnectivityResult> results) =>
      results.any((r) => r != ConnectivityResult.none)
          ? NetworkStatus.online
          : NetworkStatus.offline;

  /// Pull catalogue, push outbox. Safe to call at any time; overlapping calls
  /// collapse into the one already in flight.
  Future<void> syncNow() async {
    if (_running) return;
    if (_state.connection == NetworkStatus.offline) {
      await _refreshPending();
      return;
    }
    _running = true;
    _emit(_state.copyWith(syncing: true, clearError: true));
    try {
      await _pullCatalogue();
      await _pushOutbox();
      _emit(_state.copyWith(lastSyncedAt: DateTime.now(), clearError: true));
    } catch (error) {
      // Sync failure is normal in the field, not exceptional. Record it and
      // try again next tick; the orders are already safe on disk.
      _emit(_state.copyWith(lastError: error.toString()));
    } finally {
      _running = false;
      await _refreshPending();
      _emit(_state.copyWith(syncing: false));
    }
  }

  Future<void> _pullCatalogue() async {
    final since = await _products.latestUpdatedAt();
    final fetched = await _api.fetchProducts(updatedSince: since);
    await _products.upsertAll(fetched);

    final customerSince = await _customers.latestUpdatedAt();
    final customers = await _api.fetchCustomers(updatedSince: customerSince);
    await _customers.upsertAll(customers);
  }

  Future<void> _pushOutbox() async {
    final pending = await _orders.pendingOutbox();
    if (pending.isEmpty) return;
    final outcomes = await _api.pushOrders(pending);
    for (final outcome in outcomes) {
      if (outcome.accepted) {
        await _orders.markSynced(outcome.clientUuid, outcome.orderId);
      } else {
        await _orders.markRejected(
            outcome.clientUuid, outcome.detail ?? 'rejected by server');
      }
    }
  }

  Future<void> retryRejected() async {
    await _orders.requeueRejected();
    await syncNow();
  }

  Future<void> _refreshPending() async {
    final pending = await _orders.pendingCount();
    _emit(_state.copyWith(pending: pending));
  }

  /// Called right after an order is saved so the pill updates without waiting
  /// for a network round trip.
  Future<void> noteLocalChange() async {
    await _refreshPending();
    if (_state.connection == NetworkStatus.online) {
      unawaited(syncNow());
    }
  }

  void _emit(SyncState next) {
    _state = next;
    if (!_controller.isClosed) _controller.add(next);
  }

  Future<void> dispose() async {
    _ticker?.cancel();
    await _connectivitySub?.cancel();
    await _controller.close();
  }
}
