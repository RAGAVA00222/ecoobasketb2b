/// Salesmen type the same shop's number three different ways across a week:
/// `9876543210`, `+91 98765 43210`, `09876543210`. Normalising on the way in
/// is what keeps one shop as one customer — and what makes the name auto-fill
/// actually hit.
String normaliseMobile(String raw) {
  var digits = raw.replaceAll(RegExp(r'\D'), '');
  if (digits.length == 12 && digits.startsWith('91')) {
    digits = digits.substring(2);
  } else if (digits.length == 11 && digits.startsWith('0')) {
    digits = digits.substring(1);
  }
  return digits;
}

/// Indian mobile numbers are 10 digits starting 6-9. The check is deliberately
/// loose — blocking a booking over a number format would cost more than it saves.
bool isCompleteMobile(String raw) {
  final digits = normaliseMobile(raw);
  return digits.length == 10 && RegExp(r'^[6-9]').hasMatch(digits);
}

String formatMobile(String raw) {
  final d = normaliseMobile(raw);
  if (d.length != 10) return raw;
  return '${d.substring(0, 5)} ${d.substring(5)}';
}
