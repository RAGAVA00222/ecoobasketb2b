import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/mobile_number.dart';
import '../../../core/theme.dart';
import '../../../data/models/customer.dart';
import '../../../state/order_draft.dart';
import '../../../state/providers.dart';

/// Mobile number in, customer name out. Two fields, nothing else — no address,
/// no GST, no shop type. The number is the identity.
class CustomerHeader extends ConsumerStatefulWidget {
  const CustomerHeader({super.key, this.autofocus = true});

  final bool autofocus;

  @override
  ConsumerState<CustomerHeader> createState() => CustomerHeaderState();
}

class CustomerHeaderState extends ConsumerState<CustomerHeader> {
  final _mobileController = TextEditingController();
  final _nameController = TextEditingController();
  final _mobileFocus = FocusNode();
  final _nameFocus = FocusNode();

  bool _looking = false;
  String _lastLookedUp = '';

  /// Called by the parent after a save so the next customer starts with an
  /// empty, focused number field and zero taps of cleanup.
  void resetForNextCustomer() {
    _mobileController.clear();
    _nameController.clear();
    _lastLookedUp = '';
    setState(() => _looking = false);
    _mobileFocus.requestFocus();
  }

  void primeFrom(String mobile, String name) {
    _mobileController.text = formatMobile(mobile);
    _nameController.text = name;
    _lastLookedUp = normaliseMobile(mobile);
  }

  @override
  void dispose() {
    _mobileController.dispose();
    _nameController.dispose();
    _mobileFocus.dispose();
    _nameFocus.dispose();
    super.dispose();
  }

  Future<void> _onMobileChanged(String raw) async {
    ref.read(orderDraftProvider.notifier).setMobile(raw);

    final normalised = normaliseMobile(raw);
    if (!isCompleteMobile(raw)) {
      _lastLookedUp = '';
      return;
    }
    if (normalised == _lastLookedUp) return;
    _lastLookedUp = normalised;

    setState(() => _looking = true);
    Customer? found;
    try {
      found = await ref.read(customerLookupProvider(normalised).future);
    } catch (_) {
      found = null; // never block a booking on a lookup
    }
    if (!mounted) return;
    setState(() => _looking = false);

    if (found != null) {
      _nameController.text = found.name;
      ref.read(orderDraftProvider.notifier).applyKnownCustomer(found);
      // Known shop: skip the name field entirely and go straight to products.
      FocusScope.of(context).unfocus();
    } else {
      // New shop: the only thing left to type is the name, so put the cursor
      // there without the salesman reaching for it.
      _nameFocus.requestFocus();
    }
  }

  @override
  Widget build(BuildContext context) {
    final known = ref.watch(orderDraftProvider.select((d) => d.customerKnown));

    return AppCard(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(14, 14, 14, 14),
        child: Column(
          children: [
            TextField(
              controller: _mobileController,
              focusNode: _mobileFocus,
              autofocus: widget.autofocus,
              keyboardType: TextInputType.phone,
              textInputAction: TextInputAction.next,
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w700,
                letterSpacing: 1.2,
              ),
              inputFormatters: [
                FilteringTextInputFormatter.allow(RegExp(r'[0-9 +]')),
                LengthLimitingTextInputFormatter(15),
              ],
              decoration: InputDecoration(
                hintText: 'Customer mobile number',
                prefixIcon: const Icon(Icons.phone_android_rounded),
                suffixIcon: _looking
                    ? const Padding(
                        padding: EdgeInsets.all(14),
                        child: SizedBox(
                          width: 18,
                          height: 18,
                          child: CircularProgressIndicator(strokeWidth: 2.2),
                        ),
                      )
                    : (known
                        ? const Icon(Icons.check_circle_rounded,
                            color: AppTheme.green)
                        : null),
              ),
              onChanged: _onMobileChanged,
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _nameController,
              focusNode: _nameFocus,
              textCapitalization: TextCapitalization.words,
              textInputAction: TextInputAction.done,
              style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w600),
              decoration: InputDecoration(
                hintText: 'Customer name',
                prefixIcon: const Icon(Icons.storefront_rounded),
                helperText: known ? 'Existing customer' : null,
                helperStyle: const TextStyle(
                  color: AppTheme.green,
                  fontWeight: FontWeight.w600,
                ),
              ),
              onChanged: (value) =>
                  ref.read(orderDraftProvider.notifier).setCustomerName(value),
            ),
          ],
        ),
      ),
    );
  }
}
