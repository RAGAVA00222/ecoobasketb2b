import 'package:flutter/foundation.dart';

/// A customer is a mobile number and a name. Nothing else — no address, no
/// GSTIN, no credit terms. That is the whole point of this app.
@immutable
class Customer {
  const Customer({
    this.id,
    required this.mobile,
    required this.name,
    required this.updatedAt,
  });

  final int? id;
  final String mobile;
  final String name;
  final DateTime updatedAt;

  factory Customer.fromApi(Map<String, dynamic> json) => Customer(
        id: json['id'] as int?,
        mobile: json['mobile'] as String,
        name: json['name'] as String,
        updatedAt: DateTime.parse(json['updated_at'] as String).toUtc(),
      );

  factory Customer.fromRow(Map<String, Object?> row) => Customer(
        id: row['id'] as int?,
        mobile: row['mobile'] as String,
        name: row['name'] as String,
        updatedAt: DateTime.fromMillisecondsSinceEpoch(
            row['updated_at'] as int,
            isUtc: true),
      );

  Map<String, Object?> toRow() => {
        if (id != null) 'id': id,
        'mobile': mobile,
        'name': name,
        'updated_at': updatedAt.millisecondsSinceEpoch,
      };
}
