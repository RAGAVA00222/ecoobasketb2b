import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'core/theme.dart';
import 'features/shell/home_shell.dart';
import 'state/providers.dart';

class EcooOrderApp extends ConsumerStatefulWidget {
  const EcooOrderApp({super.key});

  @override
  ConsumerState<EcooOrderApp> createState() => _EcooOrderAppState();
}

class _EcooOrderAppState extends ConsumerState<EcooOrderApp> {
  @override
  void initState() {
    super.initState();
    // Sync starts after the first frame is on screen. The dashboard is
    // already interactive by the time the radio is touched.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(syncServiceProvider).start();
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ecoo Basket Orders',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      home: const HomeShell(),
    );
  }
}
