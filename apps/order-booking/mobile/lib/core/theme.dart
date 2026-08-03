import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Material 3, Ecoo Basket green with a professional blue as the secondary.
/// Type is scaled up across the board: this is read at arm's length, in
/// daylight, by someone holding the phone in one hand.
class AppTheme {
  static const Color green = Color(0xFF1E7D3A);
  static const Color greenDark = Color(0xFF145A32);
  static const Color blue = Color(0xFF1B4FA0);
  static const Color surface = Color(0xFFF6F8F7);
  static const Color ink = Color(0xFF14211A);

  /// Touch targets. 56dp minimum on anything a salesman hits repeatedly —
  /// the qty steppers get pressed a few hundred times a day, often one-handed
  /// while holding a crate.
  static const double tapTarget = 56;
  static const double cardRadius = 20;

  static ThemeData light() {
    final scheme = ColorScheme.fromSeed(
      seedColor: green,
      primary: green,
      secondary: blue,
      brightness: Brightness.light,
    ).copyWith(surface: Colors.white);

    final base = ThemeData(useMaterial3: true, colorScheme: scheme);

    return base.copyWith(
      scaffoldBackgroundColor: surface,
      textTheme: base.textTheme.apply(
        bodyColor: ink,
        displayColor: ink,
        fontSizeFactor: 1.05,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        systemOverlayStyle: SystemUiOverlayStyle.dark,
        titleTextStyle: TextStyle(
          color: ink,
          fontSize: 22,
          fontWeight: FontWeight.w700,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 18, vertical: 18),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFFDDE4E0)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFFDDE4E0)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: green, width: 2),
        ),
        hintStyle: const TextStyle(color: Color(0xFF8C9A93), fontSize: 17),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          minimumSize: const Size.fromHeight(tapTarget),
          textStyle: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        height: 68,
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        indicatorColor: green.withValues(alpha: 0.14),
        labelTextStyle: WidgetStateProperty.all(
          const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600),
        ),
      ),
      snackBarTheme: SnackBarThemeData(
        behavior: SnackBarBehavior.floating,
        backgroundColor: greenDark,
        contentTextStyle: const TextStyle(color: Colors.white, fontSize: 15),
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      ),
      dividerTheme: const DividerThemeData(color: Color(0xFFE6EBE8), space: 1),
    );
  }
}

/// The app's surface. A plain widget rather than a `cardTheme` override on
/// Material's `Card`, because the type behind `ThemeData.cardTheme` has been
/// renamed across Flutter releases and this app should not care which release
/// it is built with.
class AppCard extends StatelessWidget {
  const AppCard({super.key, required this.child, this.padding});

  final Widget child;
  final EdgeInsetsGeometry? padding;

  @override
  Widget build(BuildContext context) {
    // A Material, not a decorated Container: several of these cards have an
    // InkWell inside them, and a ripple needs a Material immediately above it
    // or it paints behind the card and is never seen.
    return Material(
      color: Colors.white,
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        side: const BorderSide(color: Color(0xFFE6EBE8)),
      ),
      child: padding == null ? child : Padding(padding: padding!, child: child),
    );
  }
}
