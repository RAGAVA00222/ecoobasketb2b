import 'package:ecoo_order_booking/core/mobile_number.dart';
import 'package:ecoo_order_booking/core/money.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('rupee formatting', () {
    test('uses Indian lakh grouping, not thousands', () {
      // 1,23,456 — not 123,456. Getting this wrong makes an admin re-read
      // every figure on the sheet.
      expect(12345600.asRupees, '₹1,23,456');
    });

    test('drops paise on the running total but keeps them when exact', () {
      expect(460050.asRupees, '₹4,601');
      expect(460050.asRupeesExact, '₹4,600.50');
    });

    test('zero reads as zero, not as blank', () {
      expect(0.asRupees, '₹0');
    });
  });

  group('price entry', () {
    test('accepts what an admin actually types', () {
      expect(rupeesTextToPaise('920'), 92000);
      expect(rupeesTextToPaise('920.50'), 92050);
      expect(rupeesTextToPaise('₹920'), 92000);
      expect(rupeesTextToPaise(' 1,240 '), 124000);
    });

    test('rejects text that is not a price rather than guessing zero', () {
      expect(rupeesTextToPaise(''), isNull);
      expect(rupeesTextToPaise('abc'), isNull);
      expect(rupeesTextToPaise('1.2.3'), isNull);
    });

    test('round-trips through the edit field without drifting', () {
      for (final paise in [92000, 88050, 5, 100, 123456]) {
        expect(rupeesTextToPaise(paiseToRupeesText(paise)), paise);
      }
    });
  });

  group('mobile numbers', () {
    test('the same shop typed three ways is one shop', () {
      const expected = '9876543210';
      expect(normaliseMobile('9876543210'), expected);
      expect(normaliseMobile('+91 98765 43210'), expected);
      expect(normaliseMobile('09876543210'), expected);
      expect(normaliseMobile('98765-43210'), expected);
    });

    test('completeness gates the save button', () {
      expect(isCompleteMobile('9876543210'), isTrue);
      expect(isCompleteMobile('+919876543210'), isTrue);
      expect(isCompleteMobile('98765'), isFalse);
      expect(isCompleteMobile('1234567890'), isFalse,
          reason: 'Indian mobiles start 6-9');
    });

    test('display formatting is readable at a glance', () {
      expect(formatMobile('9876543210'), '98765 43210');
    });
  });
}
