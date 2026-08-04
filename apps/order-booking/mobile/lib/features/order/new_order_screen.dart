import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/theme.dart';
import '../../data/models/order.dart';
import '../../state/order_draft.dart';
import '../../state/providers.dart';
import '../shell/sync_pill.dart';
import 'widgets/customer_header.dart';
import 'widgets/frequently_ordered.dart';
import 'widgets/order_summary_bar.dart';
import 'widgets/product_card.dart';

/// The whole job, on one screen: number, name, products, total, save.
///
/// There is no review step and no confirmation dialog. Saving writes to
/// SQLite and immediately hands back a blank order with the number field
/// focused — the salesman's next tap is the next shop's first digit.
class NewOrderScreen extends ConsumerStatefulWidget {
  const NewOrderScreen({super.key, this.editOrder, this.keepDraft = false});

  /// When set, the screen edits an existing order instead of booking a new one.
  final BookedOrder? editOrder;

  /// Opens without clearing the draft, for "duplicate order" — the caller has
  /// already loaded the quantities it wants carried over.
  final bool keepDraft;

  static Future<void> open(
    BuildContext context, {
    BookedOrder? editOrder,
    bool keepDraft = false,
  }) {
    return Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => NewOrderScreen(editOrder: editOrder, keepDraft: keepDraft),
      ),
    );
  }

  @override
  ConsumerState<NewOrderScreen> createState() => _NewOrderScreenState();
}

class _NewOrderScreenState extends ConsumerState<NewOrderScreen> {
  final _customerKey = GlobalKey<CustomerHeaderState>();
  final _searchController = TextEditingController();
  final _listController = ScrollController();
  bool _saving = false;

  bool get _isEdit => widget.editOrder != null;

  @override
  void initState() {
    super.initState();
    // The draft is a single app-wide object, so it always starts clean unless
    // we are deliberately loading an order to edit.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final notifier = ref.read(orderDraftProvider.notifier);
      final editing = widget.editOrder;
      if (editing == null) {
        if (!widget.keepDraft) notifier.reset();
        ref.read(productQueryProvider.notifier).state = '';
        return;
      }
      notifier.loadFrom(editing, ref.read(catalogueByIdProvider));
      _customerKey.currentState
          ?.primeFrom(editing.customerMobile, editing.customerName);
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    _listController.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    final draft = ref.read(orderDraftProvider);
    if (!draft.canSave || _saving) return;

    setState(() => _saving = true);
    final messenger = ScaffoldMessenger.of(context);
    final navigator = Navigator.of(context);
    final repository = ref.read(orderRepositoryProvider);

    try {
      if (_isEdit) {
        await repository.updateOrder(widget.editOrder!.rowId!, draft);
        ref.read(orderDraftProvider.notifier).reset();
        navigator.pop();
        messenger.showSnackBar(
          const SnackBar(content: Text('Order updated')),
        );
        return;
      }

      final saved = await repository.saveDraft(draft);
      if (!mounted) return;

      // Straight into the next customer: clear everything, scroll the product
      // list back to the top, put the cursor in the number field.
      ref.read(orderDraftProvider.notifier).reset();
      ref.read(productQueryProvider.notifier).state = '';
      _searchController.clear();
      _customerKey.currentState?.resetForNextCustomer();
      if (_listController.hasClients) _listController.jumpTo(0);

      messenger.hideCurrentSnackBar();
      messenger.showSnackBar(
        SnackBar(
          duration: const Duration(milliseconds: 1400),
          content: Text(
            '${saved.customerName} · ${saved.totalBoxes} boxes saved',
          ),
        ),
      );
    } catch (error) {
      messenger.showSnackBar(
        SnackBar(content: Text('Could not save: $error')),
      );
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final results = ref.watch(searchResultsProvider);
    final catalogue = ref.watch(catalogueProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text(_isEdit ? 'Edit Order' : 'New Order'),
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 14),
            child: Center(child: SyncPill()),
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 10),
            child: Column(
              children: [
                CustomerHeader(key: _customerKey, autofocus: !_isEdit),
                // Only renders for a known shop with history, so a new
                // customer's screen is unchanged.
                if (!_isEdit) const FrequentlyOrdered(),
                const SizedBox(height: 12),
                TextField(
                  controller: _searchController,
                  textInputAction: TextInputAction.search,
                  // Filtering runs synchronously against the in-memory
                  // catalogue on every keystroke — no debounce, because the
                  // work is smaller than the delay a debounce would add.
                  onChanged: (value) =>
                      ref.read(productQueryProvider.notifier).state = value,
                  decoration: InputDecoration(
                    hintText: 'Search products…',
                    prefixIcon: const Icon(Icons.search_rounded),
                    suffixIcon: _searchController.text.isEmpty
                        ? null
                        : IconButton(
                            icon: const Icon(Icons.close_rounded),
                            onPressed: () {
                              _searchController.clear();
                              ref.read(productQueryProvider.notifier).state = '';
                            },
                          ),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: catalogue.when(
              loading: () =>
                  const Center(child: CircularProgressIndicator()),
              error: (error, _) => _EmptyState(
                icon: Icons.error_outline_rounded,
                title: 'Could not load products',
                message: '$error',
              ),
              data: (_) => results.isEmpty
                  ? const _EmptyState(
                      icon: Icons.search_off_rounded,
                      title: 'No products found',
                      message: 'Try a shorter word, like "good" or "milk".',
                    )
                  : ListView.builder(
                      controller: _listController,
                      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                      itemCount: results.length,
                      // Cards hold no state worth preserving — quantities live
                      // in the draft — so off-screen rows are dropped rather
                      // than kept alive.
                      addAutomaticKeepAlives: false,
                      addRepaintBoundaries: true,
                      itemBuilder: (context, index) => Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: ProductCard(
                          key: ValueKey(results[index].id),
                          product: results[index],
                        ),
                      ),
                    ),
            ),
          ),
          OrderSummaryBar(
            onSave: _save,
            saving: _saving,
            saveLabel:
                _isEdit ? 'Update Order' : 'Save Order & Next Customer',
          ),
        ],
      ),
    );
  }
}

class _EmptyState extends StatelessWidget {
  const _EmptyState({
    required this.icon,
    required this.title,
    required this.message,
  });

  final IconData icon;
  final String title;
  final String message;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 44, color: const Color(0xFFB6C1BB)),
            const SizedBox(height: 12),
            Text(
              title,
              style: const TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.w700,
                color: AppTheme.ink,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              message,
              textAlign: TextAlign.center,
              style: const TextStyle(color: Color(0xFF6B7A73), fontSize: 14),
            ),
          ],
        ),
      ),
    );
  }
}
