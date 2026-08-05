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
enum ExportFormat { excel, loadSheetPdf }

/// One tap: the server builds the file and the phone hands it straight to
/// WhatsApp, Gmail or Drive via the system share sheet. Building either format
/// on the device would be slower and would still only see this one salesman's
/// orders.
Future<void> exportExcelForDay(
  BuildContext context,
  WidgetRef ref,
  String day, {
  String? toDay,
  ExportFormat format = ExportFormat.excel,
}) async {
  final messenger = ScaffoldMessenger.of(context);
  final sync = ref.read(syncServiceProvider);
  final isPdf = format == ExportFormat.loadSheetPdf;

  if (sync.state.connection == NetworkStatus.offline) {
    messenger.showSnackBar(
      SnackBar(
        content: Text(
          'Offline — connect to the internet to export '
          '${isPdf ? 'the load sheet' : 'Excel'}.',
        ),
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
    SnackBar(content: Text('Preparing ${isPdf ? 'PDF' : 'Excel'}…')),
  );

  try {
    final api = ref.read(apiClientProvider);
    final end = toDay ?? day;
    final bytes = isPdf
        ? await api.downloadLoadSheetPdf(fromDay: day, toDay: end)
        : await api.downloadExport(fromDay: day, toDay: end);

    final dir = await getTemporaryDirectory();
    final stem = isPdf ? 'ecoo-load-sheet' : 'ecoo-orders';
    final range = (end == day) ? day : '$day-to-$end';
    final name = '$stem-$range.${isPdf ? 'pdf' : 'xlsx'}';
    final file = File(p.join(dir.path, name));
    await file.writeAsBytes(bytes, flush: true);

    await Share.shareXFiles(
      [XFile(file.path, mimeType: isPdf ? 'application/pdf' : _xlsxMime)],
      subject: isPdf
          ? 'Ecoo Basket load sheet $day'
          : 'Ecoo Basket orders $day',
      text: isPdf
          ? 'Product-wise load sheet for $day'
          : 'Orders and load sheet for $day',
    );
  } catch (error) {
    messenger.showSnackBar(
      SnackBar(content: Text('Export failed: $error')),
    );
  }
}

const _xlsxMime =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
