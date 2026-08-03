import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../core/theme.dart';
import '../../state/providers.dart';
import 'product_catalogue_screen.dart';

/// Deliberately thin. Two fields the distributor sets once at handover, and a
/// sync panel. Everything else — prices, product images, who is a customer —
/// is decided on the server, not on a field device.
class SettingsScreen extends ConsumerStatefulWidget {
  const SettingsScreen({super.key});

  @override
  ConsumerState<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends ConsumerState<SettingsScreen> {
  @override
  Widget build(BuildContext context) {
    final config = ref.watch(appConfigProvider);
    final sync = ref.watch(syncStateProvider).valueOrNull ??
        ref.watch(syncServiceProvider).state;
    final catalogue = ref.watch(catalogueProvider);

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 28),
      children: [
        Text(
          'Settings',
          style: Theme.of(context)
              .textTheme
              .headlineSmall
              ?.copyWith(fontWeight: FontWeight.w800),
        ),
        const SizedBox(height: 14),

        AppCard(
          child: Column(
            children: [
              ListTile(
                leading: const Icon(Icons.badge_outlined),
                title: const Text('Salesman code'),
                subtitle: Text(config.salesmanCode),
                trailing: const Icon(Icons.chevron_right_rounded),
                onTap: () => _edit(
                  title: 'Salesman code',
                  initial: config.salesmanCode,
                  apply: ref.read(appConfigProvider.notifier).setSalesmanCode,
                ),
              ),
              const Divider(height: 1),
              ListTile(
                leading: const Icon(Icons.cloud_outlined),
                title: const Text('Server address'),
                subtitle: Text(
                  config.apiBaseUrl,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                trailing: const Icon(Icons.chevron_right_rounded),
                onTap: () => _edit(
                  title: 'Server address',
                  initial: config.apiBaseUrl,
                  keyboardType: TextInputType.url,
                  apply: ref.read(appConfigProvider.notifier).setApiBaseUrl,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),

        AppCard(
          child: Column(
            children: [
              ListTile(
                leading: Icon(
                  sync.pending > 0
                      ? Icons.cloud_upload_outlined
                      : Icons.cloud_done_outlined,
                  color: sync.pending > 0
                      ? const Color(0xFF9A6700)
                      : AppTheme.green,
                ),
                title: Text(sync.label),
                subtitle: Text(
                  sync.lastSyncedAt == null
                      ? 'Not synced yet on this device'
                      : 'Last synced ${DateFormat('d MMM, h:mm a').format(sync.lastSyncedAt!)}',
                ),
              ),
              if (sync.lastError != null)
                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
                  child: Text(
                    sync.lastError!,
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                        fontSize: 12, color: Color(0xFFB3261E)),
                  ),
                ),
              const Divider(height: 1),
              Padding(
                padding: const EdgeInsets.all(12),
                child: Row(
                  children: [
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: () =>
                            ref.read(syncServiceProvider).syncNow(),
                        icon: const Icon(Icons.sync_rounded, size: 18),
                        label: const Text('Sync now'),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: () async {
                          await ref.read(syncServiceProvider).retryRejected();
                          ref
                              .read(ordersRevisionProvider.notifier)
                              .update((r) => r + 1);
                        },
                        icon: const Icon(Icons.replay_rounded, size: 18),
                        label: const Text('Retry failed'),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),

        AppCard(
          child: Column(
            children: [
              ListTile(
                leading: const Icon(Icons.inventory_2_outlined),
                title: const Text('Product catalogue'),
                subtitle: Text(
                  '${catalogue.valueOrNull?.length ?? 0} active products'
                  '${catalogue.valueOrNull == null ? '' : ' · prices set by admin'}',
                ),
                trailing: const Icon(Icons.chevron_right_rounded),
                onTap: () => Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => const ProductCatalogueScreen(),
                  ),
                ),
              ),
              const Divider(height: 1),
              Padding(
                padding: const EdgeInsets.all(12),
                child: SizedBox(
                  width: double.infinity,
                  child: OutlinedButton.icon(
                    onPressed: () async {
                      await ref.read(syncServiceProvider).syncNow();
                      await ref.read(catalogueProvider.notifier).reload();
                      if (!context.mounted) return;
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Catalogue refreshed')),
                      );
                    },
                    icon: const Icon(Icons.download_rounded, size: 18),
                    label: const Text('Refresh catalogue'),
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 18),

        const _PriceNotice(),
      ],
    );
  }

  Future<void> _edit({
    required String title,
    required String initial,
    required Future<void> Function(String) apply,
    TextInputType? keyboardType,
  }) async {
    final controller = TextEditingController(text: initial);
    final value = await showDialog<String>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: Text(title),
        content: TextField(
          controller: controller,
          autofocus: true,
          keyboardType: keyboardType,
          decoration: InputDecoration(labelText: title),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () =>
                Navigator.of(dialogContext).pop(controller.text.trim()),
            child: const Text('Save'),
          ),
        ],
      ),
    );
    if (value == null || value.isEmpty) return;

    await apply(value);
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Saved')),
    );
  }
}

class _PriceNotice extends StatelessWidget {
  const _PriceNotice();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.blue.withValues(alpha: 0.07),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.blue.withValues(alpha: 0.20)),
      ),
      child: const Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.lock_outline_rounded, size: 18, color: AppTheme.blue),
          SizedBox(width: 10),
          Expanded(
            child: Text(
              'Product names, images, MRP and box prices are managed by the '
              'admin on the server. The field app can read them but never '
              'change them, so two salesmen can never quote different prices.',
              style: TextStyle(fontSize: 13, height: 1.4),
            ),
          ),
        ],
      ),
    );
  }
}
