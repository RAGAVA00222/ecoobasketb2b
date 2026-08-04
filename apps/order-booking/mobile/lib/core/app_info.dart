/// Build identity, shown on the Settings screen so a support call can start
/// with "which version is on that phone?".
///
/// Kept as a constant rather than read through a plugin: one fewer native
/// dependency on the launch path, and the value is only ever displayed.
/// Bump it together with `version:` in pubspec.yaml.
class AppInfo {
  const AppInfo._();

  static const version = '2.0.0';
  static const buildFlavour = String.fromEnvironment(
    'ECOO_BUILD',
    defaultValue: 'sideload',
  );

  static const about =
      'Ecoo Basket order booking for field sales. Orders are saved on the '
      'phone first and sync to the office automatically when there is signal, '
      'so booking never depends on the network.';
}
