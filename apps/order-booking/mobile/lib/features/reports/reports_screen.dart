import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../core/mobile_number.dart';
import '../../core/money.dart';
import '../../core/theme.dart';
import '../../data/local/order_dao.dart';
import '../../data/models/order.dart';
import '../../state/providers.dart';
import 'export_action.dart';

/// Reports run off the device database, so they work with no signal — which
/// is the only way a salesman can check their own day from inside a market.
class ReportsScreen extends ConsumerStatefulWidget {
  const ReportsScreen({super.key});

  @override
  ConsumerState<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends ConsumerState<ReportsScreen> {
  DateTime _day = DateTime.now();

  String get _dayKey => dayKey(_day);

  Future<void> _pickDay() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _day,
      firstDate: DateTime.now().subtract(const Duration(days: 365)),
      lastDate: DateTime.now(),
    );
    if (picked != null) setState(() => _day = picked);
  }

  @override
  Widget build(BuildContext context) {
    final stats = ref.watch(dayStatsProvider(_dayKey));
    final loadSheet = ref.watch(loadSheetProvider(_dayKey));
    final customers = ref.watch(customerTotalsProvider(_dayKey));
    final config = ref.watch(appConfigProvider);
    final data = stats.valueOrNull ?? DayStats.empty;

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 28),
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                'Reports',
                style: Theme.of(context)
                    .textTheme
                    .headlineSmall
                    ?.copyWith(fontWeight: FontWeight.w800),
              ),
            ),
            TextButton.icon(
              onPressed: _pickDay,
              icon: const Icon(Icons.calendar_today_rounded, size: 17),
              label: Text(DateFormat('d MMM yyyy').format(_day)),
            ),
          ],
        ),
        const SizedBox(height: 8),

        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 2.1,
          children: [
            _MiniStat(label: 'Orders', value: '${data.orders}'),
            _MiniStat(label: 'Customers', value: '${data.customers}'),
            _MiniStat(label: 'Boxes', value: '${data.boxes}'),
            _MiniStat(label: 'Sales Value', value: data.valuePaise.asRupees),
          ],
        ),
        const SizedBox(height: 20),

        // The load sheet. This is what gets sent to the warehouse.
        _Section(
          title: 'Load Sheet — Product Wise',
          subtitle: 'Boxes to order from the supplier',
          trailing: TextButton.icon(
            onPressed: () => exportExcelForDay(context, ref, _dayKey),
            icon: const Icon(Icons.file_download_outlined, size: 18),
            label: const Text('Excel'),
          ),
          child: loadSheet.when(
            loading: () => const _Loading(),
            error: (error, _) => Text('$error'),
            data: (lines) => lines.isEmpty
                ? const _Empty(message: 'No orders booked on this day.')
                : Column(
                    children: [
                      for (final line in lines)
                        _Row(
                          title: line.productName,
                          leadValue: '${line.boxes}',
                          leadLabel: 'boxes',
                          trailing: line.valuePaise.asRupees,
                        ),
                      const Divider(height: 20),
                      _Row(
                        title: 'Total',
                        leadValue:
                            '${lines.fold<int>(0, (sum, l) => sum + l.boxes)}',
                        leadLabel: 'boxes',
                        trailing: lines
                            .fold<int>(0, (sum, l) => sum + l.valuePaise)
                            .asRupees,
                        bold: true,
                      ),
                    ],
                  ),
          ),
        ),
        const SizedBox(height: 14),

        _Section(
          title: 'Top Customers',
          subtitle: 'By order value',
          child: customers.when(
            loading: () => const _Loading(),
            error: (error, _) => Text('$error'),
            data: (lines) => lines.isEmpty
                ? const _Empty(message: 'No customers billed on this day.')
                : Column(
                    children: [
                      for (final line in lines.take(10))
                        _Row(
                          title: line.name,
                          subtitle: formatMobile(line.mobile),
                          leadValue: '${line.boxes}',
                          leadLabel: 'boxes',
                          trailing: line.valuePaise.asRupees,
                        ),
                    ],
                  ),
          ),
        ),
        const SizedBox(height: 14),

        _Section(
          title: 'Salesman Summary',
          // This device only holds its own orders. The consolidated,
          // all-salesmen view is the admin's, from the server export.
          subtitle: 'This device · ${config.salesmanCode}',
          child: Column(
            children: [
              _Row(
                title: config.salesmanCode,
                leadValue: '${data.orders}',
                leadLabel: 'orders',
                trailing: data.valuePaise.asRupees,
              ),
              _Row(
                title: 'Boxes booked',
                leadValue: '${data.boxes}',
                leadLabel: 'boxes',
                trailing: '',
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _MiniStat extends StatelessWidget {
  const _MiniStat({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerLeft,
              child: Text(
                value,
                style: const TextStyle(
                    fontSize: 24, fontWeight: FontWeight.w800, height: 1.1),
              ),
            ),
            const SizedBox(height: 2),
            Text(
              label,
              style: const TextStyle(
                fontSize: 12.5,
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

class _Section extends StatelessWidget {
  const _Section({
    required this.title,
    required this.child,
    this.subtitle,
    this.trailing,
  });

  final String title;
  final String? subtitle;
  final Widget? trailing;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: const TextStyle(
                            fontSize: 16.5, fontWeight: FontWeight.w800),
                      ),
                      if (subtitle != null)
                        Text(
                          subtitle!,
                          style: const TextStyle(
                            fontSize: 12.5,
                            color: Color(0xFF6B7A73),
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                    ],
                  ),
                ),
                if (trailing != null) trailing!,
              ],
            ),
            const SizedBox(height: 10),
            child,
          ],
        ),
      ),
    );
  }
}

class _Row extends StatelessWidget {
  const _Row({
    required this.title,
    required this.leadValue,
    required this.leadLabel,
    required this.trailing,
    this.subtitle,
    this.bold = false,
  });

  final String title;
  final String? subtitle;
  final String leadValue;
  final String leadLabel;
  final String trailing;
  final bool bold;

  @override
  Widget build(BuildContext context) {
    final weight = bold ? FontWeight.w800 : FontWeight.w600;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 7),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(fontSize: 15, fontWeight: weight),
                ),
                if (subtitle != null)
                  Text(
                    subtitle!,
                    style: const TextStyle(
                        fontSize: 12, color: Color(0xFF6B7A73)),
                  ),
              ],
            ),
          ),
          const SizedBox(width: 10),
          RichText(
            text: TextSpan(
              style: DefaultTextStyle.of(context).style,
              children: [
                TextSpan(
                  text: leadValue,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                    color: AppTheme.greenDark,
                  ),
                ),
                TextSpan(
                  text: ' $leadLabel',
                  style: const TextStyle(
                    fontSize: 12,
                    color: Color(0xFF6B7A73),
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          if (trailing.isNotEmpty) ...[
            const SizedBox(width: 12),
            SizedBox(
              width: 88,
              child: Text(
                trailing,
                textAlign: TextAlign.right,
                style: TextStyle(fontSize: 14.5, fontWeight: weight),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _Loading extends StatelessWidget {
  const _Loading();

  @override
  Widget build(BuildContext context) => const Padding(
        padding: EdgeInsets.symmetric(vertical: 18),
        child: Center(
          child: SizedBox(
            width: 22,
            height: 22,
            child: CircularProgressIndicator(strokeWidth: 2.4),
          ),
        ),
      );
}

class _Empty extends StatelessWidget {
  const _Empty({required this.message});

  final String message;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(vertical: 14),
        child: Text(
          message,
          style: const TextStyle(color: Color(0xFF6B7A73)),
        ),
      );
}
