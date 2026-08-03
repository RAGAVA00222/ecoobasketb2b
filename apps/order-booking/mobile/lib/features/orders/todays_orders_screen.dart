import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../core/mobile_number.dart';
import '../../core/money.dart';
import '../../core/theme.dart';
import '../../data/models/order.dart';
import '../../state/providers.dart';
import '../order/new_order_screen.dart';
import '../reports/export_action.dart';
import '../shell/sync_pill.dart';

class TodaysOrdersScreen extends ConsumerStatefulWidget {
  const TodaysOrdersScreen({super.key});

  @override
  ConsumerState<TodaysOrdersScreen> createState() => _TodaysOrdersScreenState();
}

class _TodaysOrdersScreenState extends ConsumerState<TodaysOrdersScreen> {
  final _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final day = todayKey();
    final orders = ref.watch(filteredOrdersProvider(day));
    final stats = ref.watch(dayStatsProvider(day));

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 0),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Today's Orders",
                      style: Theme.of(context)
                          .textTheme
                          .headlineSmall
                          ?.copyWith(fontWeight: FontWeight.w800),
                    ),
                    Text(
                      '${stats.valueOrNull?.orders ?? 0} orders  ·  '
                      '${stats.valueOrNull?.boxes ?? 0} boxes  ·  '
                      '${(stats.valueOrNull?.valuePaise ?? 0).asRupees}',
                      style: const TextStyle(
                        color: Color(0xFF6B7A73),
                        fontSize: 13.5,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
              IconButton(
                tooltip: 'Export Excel',
                onPressed: () => exportExcelForDay(context, ref, day),
                icon: const Icon(Icons.file_download_outlined),
              ),
              const SyncPill(),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
          child: TextField(
            controller: _searchController,
            onChanged: (value) =>
                ref.read(orderSearchProvider.notifier).state = value,
            decoration: InputDecoration(
              hintText: 'Search name or mobile…',
              prefixIcon: const Icon(Icons.search_rounded),
              suffixIcon: _searchController.text.isEmpty
                  ? null
                  : IconButton(
                      icon: const Icon(Icons.close_rounded),
                      onPressed: () {
                        _searchController.clear();
                        ref.read(orderSearchProvider.notifier).state = '';
                      },
                    ),
            ),
          ),
        ),
        Expanded(
          child: orders.when(
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (error, _) => Center(child: Text('$error')),
            data: (list) => list.isEmpty
                ? const _NoOrders()
                : ListView.builder(
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 20),
                    itemCount: list.length,
                    itemBuilder: (context, index) =>
                        _OrderTile(order: list[index]),
                  ),
          ),
        ),
      ],
    );
  }
}

class _OrderTile extends ConsumerWidget {
  const _OrderTile({required this.order});

  final BookedOrder order;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: AppCard(
        child: InkWell(
          borderRadius: BorderRadius.circular(AppTheme.cardRadius),
          onTap: () => _showActions(context, ref),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        order.customerName,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 3),
                      Text(
                        formatMobile(order.customerMobile),
                        style: const TextStyle(
                          fontSize: 14,
                          color: Color(0xFF6B7A73),
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          _Chip(
                            icon: Icons.inventory_2_outlined,
                            label: '${order.totalBoxes} boxes',
                          ),
                          const SizedBox(width: 8),
                          _Chip(
                            icon: Icons.schedule_rounded,
                            label: DateFormat('h:mm a').format(order.bookedAt),
                          ),
                          if (order.syncStatus != SyncStatus.synced) ...[
                            const SizedBox(width: 8),
                            _Chip(
                              icon: order.syncStatus == SyncStatus.rejected
                                  ? Icons.error_outline_rounded
                                  : Icons.cloud_upload_outlined,
                              label: order.syncStatus.label,
                              tint: order.syncStatus == SyncStatus.rejected
                                  ? const Color(0xFFB3261E)
                                  : const Color(0xFF9A6700),
                            ),
                          ],
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 10),
                Text(
                  order.totalValuePaise.asRupees,
                  style: const TextStyle(
                    fontSize: 19,
                    fontWeight: FontWeight.w800,
                    color: AppTheme.greenDark,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _showActions(BuildContext context, WidgetRef ref) async {
    await showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,
      builder: (sheetContext) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: Text(
                order.customerName,
                style: const TextStyle(fontWeight: FontWeight.w800),
              ),
              subtitle: Text(
                '${order.totalProducts} products · ${order.totalBoxes} boxes · '
                '${order.totalValuePaise.asRupees}',
              ),
            ),
            const Divider(),
            for (final line in order.lines)
              ListTile(
                dense: true,
                title: Text(line.productName),
                trailing: Text(
                  '${line.qtyBoxes} × ${line.boxPricePaise.asRupees}'
                  '  =  ${line.lineTotalPaise.asRupees}',
                  style: const TextStyle(fontWeight: FontWeight.w600),
                ),
              ),
            const Divider(),
            ListTile(
              leading: const Icon(Icons.edit_outlined),
              title: const Text('Edit order'),
              onTap: () {
                Navigator.of(sheetContext).pop();
                NewOrderScreen.open(context, editOrder: order);
              },
            ),
            ListTile(
              leading: const Icon(Icons.delete_outline_rounded,
                  color: Color(0xFFB3261E)),
              title: const Text('Delete order',
                  style: TextStyle(color: Color(0xFFB3261E))),
              onTap: () async {
                Navigator.of(sheetContext).pop();
                await _confirmDelete(context, ref);
              },
            ),
          ],
        ),
      ),
    );
  }

  /// Deleting is the one place the app does ask. Everything else is
  /// recoverable by re-tapping; a deleted order is a shop that gets no stock.
  Future<void> _confirmDelete(BuildContext context, WidgetRef ref) async {
    final messenger = ScaffoldMessenger.of(context);
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Delete this order?'),
        content: Text(
          '${order.customerName} · ${order.totalBoxes} boxes · '
          '${order.totalValuePaise.asRupees}',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(false),
            child: const Text('Keep'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: const Color(0xFFB3261E),
            ),
            onPressed: () => Navigator.of(dialogContext).pop(true),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
    if (confirmed != true || order.rowId == null) return;
    await ref.read(orderRepositoryProvider).deleteOrder(order.rowId!);
    messenger.showSnackBar(const SnackBar(content: Text('Order deleted')));
  }
}

class _Chip extends StatelessWidget {
  const _Chip({required this.icon, required this.label, this.tint});

  final IconData icon;
  final String label;
  final Color? tint;

  @override
  Widget build(BuildContext context) {
    final color = tint ?? const Color(0xFF6B7A73);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 13, color: color),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              color: color,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}

class _NoOrders extends StatelessWidget {
  const _NoOrders();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.receipt_long_outlined,
              size: 46, color: Color(0xFFB6C1BB)),
          const SizedBox(height: 12),
          const Text(
            'No orders yet today',
            style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 6),
          const Text(
            'Tap New Order on the dashboard to start.',
            style: TextStyle(color: Color(0xFF6B7A73)),
          ),
        ],
      ),
    );
  }
}
