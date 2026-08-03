import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';

import '../../data/sync/sync_service.dart';
import '../../state/providers.dart';

/// One tap: the server builds the workbook (Orders + Load Sheet + Summary)
/// and the phone hands it straight to WhatsApp, Gmail or Drive via the system
/// share sheet. Building XLSX on the device would be slower and would still
/// only see this one salesman's orders.
Future<void> exportExcelForDay(
  BuildContext context, // ignore: use_build_context_synchronously
  WidgetRef ref,
  String day, {
  String? toDay,
}) async {
  final messenger = ScaffoldMessenger.of(context);
  final sync = ref.read(syncServiceProvider);

  if (sync.state.connection == NetworkStatus.offline) {
    messenger.showSnackBar(
      const SnackBar(
        content: Text('Offline — connect to the internet to export Excel.'),
      ),
    );
    return;
  }
  if (sync.state.pending > 0) {
    // Exporting with orders still in the outbox would hand the warehouse an
    // incomplete load sheet. Push first, then export.
    messenger.showSnackBar(
      SnackBar(
        content: Text('Syncing ${sync.state.pending} pending order(s) first…'),
      ),
    );
    await sync.syncNow();
  }

  messenger.showSnackBar(
    const SnackBar(content: Text('Preparing Excel…')),
  );

  try {
    final bytes = await ref
        .read(apiClientProvider)
        .downloadExport(fromDay: day, toDay: toDay ?? day);

    final dir = await getTemporaryDirectory();
    final name = (toDay == null || toDay == day)
        ? 'ecoo-orders-$day.xlsx'
        : 'ecoo-orders-$day-to-$toDay.xlsx';
    final file = File(p.join(dir.path, name));
    await file.writeAsBytes(bytes, flush: true);

    await Share.shareXFiles(
      [XFile(file.path, mimeType: _xlsxMime)],
      subject: 'Ecoo Basket orders $day',
      text: 'Orders and load sheet for $day',
    );
  } catch (error) {
    messenger.showSnackBar(
      SnackBar(content: Text('Export failed: $error')),
    );
  }
}

const _xlsxMime =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
