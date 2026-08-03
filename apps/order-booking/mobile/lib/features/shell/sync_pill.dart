import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/sync/sync_service.dart';
import '../../state/providers.dart';

/// Offline / Pending sync / Synced — the only network status the app ever
/// shows, and it is never a blocking dialog. Tapping it forces a sync.
class SyncPill extends ConsumerWidget {
  const SyncPill({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(syncStateProvider).valueOrNull ??
        ref.watch(syncServiceProvider).state;

    final (color, icon) = switch (state) {
      SyncState(syncing: true) => (const Color(0xFF1B4FA0), Icons.sync),
      SyncState(connection: NetworkStatus.offline) => (
          const Color(0xFF9A6700),
          Icons.cloud_off_rounded,
        ),
      SyncState(pending: > 0) => (
          const Color(0xFF9A6700),
          Icons.cloud_upload_outlined,
        ),
      _ => (const Color(0xFF1E7D3A), Icons.cloud_done_outlined),
    };

    return Semantics(
      button: true,
      label: 'Sync status: ${state.label}. Tap to sync now.',
      child: InkWell(
        borderRadius: BorderRadius.circular(999),
        onTap: () => ref.read(syncServiceProvider).syncNow(),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.10),
            borderRadius: BorderRadius.circular(999),
            border: Border.all(color: color.withValues(alpha: 0.30)),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, size: 16, color: color),
              const SizedBox(width: 6),
              Text(
                state.label,
                style: TextStyle(
                  color: color,
                  fontSize: 12.5,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
