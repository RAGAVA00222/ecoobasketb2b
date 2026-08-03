import 'package:ecoo_order_booking/data/local/app_database.dart';
import 'package:ecoo_order_booking/state/providers.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

void main() {
  sqfliteFfiInit();
  databaseFactory = databaseFactoryFfi;

  late AppDatabase database;
  late ProviderContainer container;

  setUp(() async {
    database = await AppDatabase.open(path: inMemoryDatabasePath);
    container = ProviderContainer(overrides: [
      appDatabaseProvider.overrideWithValue(database),
      initialAppConfigProvider.overrideWithValue(
        const AppConfig(
          apiBaseUrl: 'https://orders.example.com',
          salesmanCode: 'SM01',
        ),
      ),
    ]);
  });

  tearDown(() async {
    container.dispose();
    await database.close();
  });

  test('the server address starts from what was read off disk', () {
    expect(container.read(appConfigProvider).apiBaseUrl,
        'https://orders.example.com');
    expect(container.read(apiClientProvider).baseUrl,
        'https://orders.example.com');
  });

  test('changing the server address applies without restarting the app',
      () async {
    final client = container.read(apiClientProvider);

    await container
        .read(appConfigProvider.notifier)
        .setApiBaseUrl('http://192.168.1.50:8000');

    expect(container.read(appConfigProvider).apiBaseUrl,
        'http://192.168.1.50:8000');
    // Same client object, new address: the address is resolved per request,
    // so nothing downstream had to be torn down and rebuilt.
    expect(identical(container.read(apiClientProvider), client), isTrue);
    expect(client.baseUrl, 'http://192.168.1.50:8000');
  });

  test('the new address survives the next launch', () async {
    await container
        .read(appConfigProvider.notifier)
        .setApiBaseUrl('  http://10.0.2.2:8000  ');
    await container.read(appConfigProvider.notifier).setSalesmanCode('SM07');

    expect(await database.readMeta(AppConfig.metaBaseUrl),
        'http://10.0.2.2:8000', reason: 'trimmed before it is stored');
    expect(await database.readMeta(AppConfig.metaSalesmanCode), 'SM07');
  });

  test('an empty value is ignored rather than stored', () async {
    await container.read(appConfigProvider.notifier).setApiBaseUrl('   ');

    expect(container.read(appConfigProvider).apiBaseUrl,
        'https://orders.example.com');
    expect(await database.readMeta(AppConfig.metaBaseUrl), isNull);
  });

  test('the salesman code reaches the orders the device books', () async {
    await container.read(appConfigProvider.notifier).setSalesmanCode('SM07');
    expect(container.read(appConfigProvider).salesmanCode, 'SM07');
  });

  test('the build-time default is only a default', () {
    // CI passes --dart-define=ECOO_API_BASE_URL, but a device that has been
    // pointed somewhere else keeps its own address. One APK, many deployments.
    expect(AppConfig.defaultBaseUrl, isNotEmpty);
    expect(container.read(appConfigProvider).apiBaseUrl,
        isNot(equals(AppConfig.defaultBaseUrl)));
  });
}
