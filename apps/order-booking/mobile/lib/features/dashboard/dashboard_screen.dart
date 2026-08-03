import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../core/money.dart';
import '../../core/theme.dart';
import '../../state/providers.dart';
import '../order/new_order_screen.dart';
import '../reports/export_action.dart';
import '../shell/home_shell.dart';
import '../shell/sync_pill.dart';

/// The first thing the app shows, with no login in front of it. Four numbers
/// and four buttons — the biggest of which starts a new order.
class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final day = todayKey();
    final stats = ref.watch(dayStatsProvider(day));
    final config = ref.watch(appConfigProvider);

    return RefreshIndicator(
      onRefresh: () async {
        ref.read(ordersRevisionProvider.notifier).update((r) => r + 1);
        await ref.read(syncServiceProvider).syncNow();
      },
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 28),
        children: [
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Ecoo Basket',
                      style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                            fontWeight: FontWeight.w800,
                          ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      '${DateFormat('EEE, d MMM').format(DateTime.now())}  ·  ${config.salesmanCode}',
                      style: const TextStyle(
                        color: Color(0xFF6B7A73),
                        fontSize: 13.5,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
              const SyncPill(),
            ],
          ),
          const SizedBox(height: 18),

          // Today at a glance.
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 1.55,
            children: [
              _StatCard(
                label: "Today's Orders",
                value: '${stats.valueOrNull?.orders ?? 0}',
                icon: Icons.receipt_long_rounded,
                tint: AppTheme.green,
              ),
              _StatCard(
                label: "Today's Customers",
                value: '${stats.valueOrNull?.customers ?? 0}',
                icon: Icons.storefront_rounded,
                tint: AppTheme.blue,
              ),
              _StatCard(
                label: 'Total Boxes',
                value: '${stats.valueOrNull?.boxes ?? 0}',
                icon: Icons.inventory_2_rounded,
                tint: const Color(0xFF7A4FBF),
              ),
              _StatCard(
                label: "Today's Value",
                value: (stats.valueOrNull?.valuePaise ?? 0).asRupees,
                icon: Icons.currency_rupee_rounded,
                tint: const Color(0xFFB8721B),
              ),
            ],
          ),
          const SizedBox(height: 20),

          // The primary action, sized so it is impossible to miss with a thumb.
          SizedBox(
            height: 72,
            child: FilledButton.icon(
              onPressed: () => NewOrderScreen.open(context),
              icon: const Icon(Icons.add_circle_outline, size: 28),
              label: const Text(
                'New Order',
                style: TextStyle(fontSize: 21, fontWeight: FontWeight.w800),
              ),
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _ActionTile(
                  icon: Icons.list_alt_rounded,
                  label: "Today's\nOrders",
                  onTap: () => context
                      .findAncestorStateOfType<HomeShellState>()
                      ?.goToTab(1),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _ActionTile(
                  icon: Icons.insights_rounded,
                  label: 'Reports',
                  onTap: () => context
                      .findAncestorStateOfType<HomeShellState>()
                      ?.goToTab(2),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _ActionTile(
                  icon: Icons.file_download_outlined,
                  label: 'Export\nExcel',
                  onTap: () => exportExcelForDay(context, ref, day),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({
    required this.label,
    required this.value,
    required this.icon,
    required this.tint,
  });

  final String label;
  final String value;
  final IconData icon;
  final Color tint;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 14, 14, 14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: const EdgeInsets.all(7),
              decoration: BoxDecoration(
                color: tint.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, size: 19, color: tint),
            ),
            FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerLeft,
              child: Text(
                value,
                style: const TextStyle(
                  fontSize: 27,
                  fontWeight: FontWeight.w800,
                  height: 1.1,
                ),
              ),
            ),
            Text(
              label,
              style: const TextStyle(
                fontSize: 13,
                color: Color(0xFF6B7A73),
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ActionTile extends StatelessWidget {
  const _ActionTile({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(AppTheme.cardRadius),
      child: InkWell(
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        onTap: onTap,
        child: Container(
          height: 96,
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(AppTheme.cardRadius),
            border: Border.all(color: const Color(0xFFE6EBE8)),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 24, color: AppTheme.greenDark),
              const SizedBox(height: 8),
              Text(
                label,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 12.5,
                  height: 1.15,
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
