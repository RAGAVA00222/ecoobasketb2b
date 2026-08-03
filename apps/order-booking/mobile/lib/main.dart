import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'app.dart';
import 'data/local/app_database.dart';
import 'state/providers.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);

  // Opening SQLite and reading two settings rows is the entire startup cost.
  // There is no login, no token refresh and no catalogue download on the
  // launch path — that is how the 2s budget is met on a low-end device.
  final database = await AppDatabase.open();
  final config = AppConfig(
    apiBaseUrl: await database.readMeta(AppConfig.metaBaseUrl) ??
        AppConfig.defaultBaseUrl,
    salesmanCode: await database.readMeta(AppConfig.metaSalesmanCode) ?? 'SM01',
  );

  runApp(
    ProviderScope(
      overrides: [
        appDatabaseProvider.overrideWithValue(database),
        appConfigProvider.overrideWithValue(config),
      ],
      child: const EcooOrderApp(),
    ),
  );
}
