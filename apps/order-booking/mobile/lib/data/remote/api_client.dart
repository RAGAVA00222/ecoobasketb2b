import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/customer.dart';
import '../models/order.dart';
import '../models/product.dart';

class ApiException implements Exception {
  ApiException(this.message, {this.statusCode});
  final String message;
  final int? statusCode;
  @override
  String toString() => 'ApiException($statusCode): $message';
}

class SyncOutcome {
  const SyncOutcome({required this.clientUuid, required this.status, this.orderId, this.detail});
  final String clientUuid;
  final String status; // created | duplicate | rejected
  final int? orderId;
  final String? detail;

  bool get accepted => status == 'created' || status == 'duplicate';
}

class ApiClient {
  ApiClient({required String Function() baseUrl, http.Client? client})
      : _baseUrl = baseUrl,
        _client = client ?? http.Client();

  /// Resolved per request, not captured once, so a server address changed in
  /// Settings applies to the very next call without restarting the app.
  final String Function() _baseUrl;
  final http.Client _client;

  String get baseUrl => _baseUrl();

  /// Short by design. Sync is a background nicety — it must never be the
  /// reason a salesman waits, so a slow network is abandoned quickly and
  /// retried on the next tick.
  static const Duration timeout = Duration(seconds: 12);

  Uri _uri(String path, [Map<String, String>? query]) =>
      Uri.parse('$baseUrl$path').replace(queryParameters: query);

  Future<List<Product>> fetchProducts({DateTime? updatedSince}) async {
    final response = await _client
        .get(_uri('/api/v1/products', {
          if (updatedSince != null)
            'updated_since': updatedSince.toUtc().toIso8601String(),
          if (updatedSince != null) 'include_inactive': 'true',
        }))
        .timeout(timeout);
    _ensureOk(response);
    final decoded = jsonDecode(response.body) as List<dynamic>;
    return decoded
        .map((e) => Product.fromApi(e as Map<String, dynamic>))
        .toList(growable: false);
  }

  Future<List<Customer>> fetchCustomers({DateTime? updatedSince}) async {
    final response = await _client
        .get(_uri('/api/v1/customers', {
          if (updatedSince != null)
            'updated_since': updatedSince.toUtc().toIso8601String(),
        }))
        .timeout(timeout);
    _ensureOk(response);
    final decoded = jsonDecode(response.body) as List<dynamic>;
    return decoded
        .map((e) => Customer.fromApi(e as Map<String, dynamic>))
        .toList(growable: false);
  }

  Future<Customer?> lookupCustomer(String mobile) async {
    final response = await _client
        .get(_uri('/api/v1/customers/lookup', {'mobile': mobile}))
        .timeout(timeout);
    if (response.statusCode == 404) return null;
    _ensureOk(response);
    return Customer.fromApi(jsonDecode(response.body) as Map<String, dynamic>);
  }

  /// Pushes the whole outbox in one request. The server answers per order, so
  /// one rejected order never holds the rest of the day hostage.
  Future<List<SyncOutcome>> pushOrders(List<BookedOrder> orders) async {
    if (orders.isEmpty) return const [];
    final response = await _client
        .post(
          _uri('/api/v1/orders/sync'),
          headers: const {'Content-Type': 'application/json'},
          body: jsonEncode([for (final o in orders) o.toApi()]),
        )
        .timeout(timeout);
    _ensureOk(response);
    final decoded = jsonDecode(response.body) as Map<String, dynamic>;
    final results = decoded['results'] as List<dynamic>;
    return [
      for (final r in results.cast<Map<String, dynamic>>())
        SyncOutcome(
          clientUuid: r['client_uuid'] as String,
          status: r['status'] as String,
          orderId: r['order_id'] as int?,
          detail: r['detail'] as String?,
        ),
    ];
  }

  /// The admin taps this and Excel arrives. Generation is the server's job —
  /// the phone should never spend battery building a workbook.
  Uri exportUrl({required String fromDay, required String toDay}) =>
      _uri('/api/v1/export/orders.xlsx', {
        'from_date': fromDay,
        'to_date': toDay,
      });

  Future<List<int>> downloadExport(
      {required String fromDay, required String toDay}) async {
    final response = await _client
        .get(exportUrl(fromDay: fromDay, toDay: toDay))
        .timeout(const Duration(seconds: 60));
    _ensureOk(response);
    return response.bodyBytes;
  }

  void _ensureOk(http.Response response) {
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw ApiException(
        response.body.isEmpty ? 'request failed' : response.body,
        statusCode: response.statusCode,
      );
    }
  }

  void dispose() => _client.close();
}
