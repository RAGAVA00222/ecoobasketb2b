import 'package:intl/intl.dart';

/// Money is integer paise end to end — device, API and database.
///
/// Order totals get summed on the phone, again on the server and a third time
/// in Excel. Doubles would disagree in the last decimal between those three,
/// and a load sheet that does not foot is a load sheet nobody trusts.
extension PaiseFormatting on int {
  /// `460000` -> `₹4,600` (Indian lakh grouping, no paise).
  String get asRupees => _whole.format(this / 100);

  /// `460050` -> `₹4,600.50` — used where the exact figure matters.
  String get asRupeesExact => _exact.format(this / 100);
}

final NumberFormat _whole =
    NumberFormat.currency(locale: 'en_IN', symbol: '₹', decimalDigits: 0);
final NumberFormat _exact =
    NumberFormat.currency(locale: 'en_IN', symbol: '₹', decimalDigits: 2);

/// Parses what an admin types into a price field ("920", "920.50", "₹920").
/// Returns null when the text is not a price, so the form can say so.
int? rupeesTextToPaise(String text) {
  final cleaned = text.replaceAll(RegExp(r'[^0-9.]'), '');
  if (cleaned.isEmpty) return null;
  final value = double.tryParse(cleaned);
  if (value == null || value.isNaN || value.isInfinite || value < 0) return null;
  return (value * 100).round();
}

String paiseToRupeesText(int paise) =>
    paise % 100 == 0 ? '${paise ~/ 100}' : (paise / 100).toStringAsFixed(2);
