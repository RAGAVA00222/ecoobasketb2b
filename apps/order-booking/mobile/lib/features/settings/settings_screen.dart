import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../core/app_info.dart';
import '../../core/theme.dart';
import '../../state/providers.dart';
import 'product_catalogue_screen.dart';

/// Deliberately thin, and deliberately read-only about anything that decides
/// money or destination.
///
/// The server address is NOT editable here. A salesman changing where orders
/// are posted is a way to lose a day's bookings, not a feature — the address
/// is fixed at build time by whoever ships the APK. Prices are the same story:
/// visible, never editable, so two salesmen can't quote different rates.
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

        // ---- Offline status ----
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
                title: Text(
                  sync.label,
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
                subtitle: Text(
                  sync.lastSyncedAt == null
                      ? 'Not synced yet on this device'
                      : 'Last synced ${DateFormat('d MMM, h:mm a').format(sync.lastSyncedAt!)}',
                ),
              ),
              if (sync.pending > 0)
                const Padding(
                  padding: EdgeInsets.fromLTRB(16, 0, 16, 8),
                  child: Text(
                    'Orders are saved on this phone and will upload by '
                    'themselves once there is signal. Nothing is lost.',
                    style: TextStyle(fontSize: 12.5, color: Color(0xFF6B7A73)),
                  ),
                ),
              if (sync.lastError != null)
                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
                  child: Text(
                    sync.lastError!,
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                    style:
                        const TextStyle(fontSize: 12, color: Color(0xFFB3261E)),
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

        // ---- Catalogue ----
        AppCard(
          child: Column(
            children: [
              ListTile(
                leading: const Icon(Icons.inventory_2_outlined),
                title: const Text('Product catalogue'),
                subtitle: Text(
                  '${catalogue.valueOrNull?.length ?? 0} products · '
                  'prices set by admin',
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
                      final messenger = ScaffoldMessenger.of(context);
                      await ref.read(syncServiceProvider).syncNow();
                      await ref.read(catalogueProvider.notifier).reload();
                      if (!mounted) return;
                      messenger.showSnackBar(
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
        const SizedBox(height: 14),

        // ---- Identity + about ----
        AppCard(
          child: Column(
            children: [
              ListTile(
                leading: const Icon(Icons.badge_outlined),
                title: const Text('Salesman code'),
                subtitle: Text(config.salesmanCode),
                // Editable because it is this device's identity, not a server
                // setting — the day's figures are attributed by it.
                trailing: const Icon(Icons.edit_outlined, size: 18),
                onTap: _editSalesmanCode,
              ),
              const Divider(height: 1),
              const ListTile(
                leading: Icon(Icons.info_outline_rounded),
                title: Text('App version'),
                subtitle: Text('${AppInfo.version} · ${AppInfo.buildFlavour}'),
              ),
              const Divider(height: 1),
              const Padding(
                padding: EdgeInsets.fromLTRB(16, 12, 16, 14),
                child: Text(
                  AppInfo.about,
                  style: TextStyle(fontSize: 13, height: 1.45),
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

  Future<void> _editSalesmanCode() async {
    final controller = TextEditingController(
      text: ref.read(appConfigProvider).salesmanCode,
    );
    final value = await showDialog<String>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Salesman code'),
        content: TextField(
          controller: controller,
          autofocus: true,
          textCapitalization: TextCapitalization.characters,
          decoration: const InputDecoration(
            labelText: 'Salesman code',
            helperText: "Identifies this phone's orders in the day's reports",
          ),
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

    await ref.read(appConfigProvider.notifier).setSalesmanCode(value);
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
