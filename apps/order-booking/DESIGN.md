# Product & UX Design

The design target is a salesman who books 40–60 shops a day, on a ₹8,000
Android phone, one-handed, standing up, often with no signal. Everything below
follows from that.

---

## Design principles

1. **Speed is the feature.** Every screen is judged by how many taps and
   milliseconds it adds to an order. A feature that is useful but slow loses.
2. **Never block on the network.** The network can fail; the booking cannot.
3. **The number is the customer.** No address, no GST, no shop category. A
   mobile number and a name is the entire customer record.
4. **No confirmation theatre.** Saving is instant and silent. The only
   destructive action — deleting a booked order — asks once.
5. **One-handed.** Primary actions sit in the bottom third. Steppers are 44dp
   squares. Body text is scaled up ~5% over Material defaults.

---

## Screens

### 1 · Dashboard

Opens immediately on launch. No login screen exists in the app at all.

- Four stat cards: Today's Orders · Today's Customers · Total Boxes · Today's
  Value.
- One oversized primary button: **➕ New Order** (72dp tall).
- Three secondary tiles: Today's Orders · Reports · Export Excel.
- Sync pill top-right; pull-to-refresh forces a sync.
- Bottom navigation: Dashboard · Orders · Reports · Settings.

The stat cards read from SQLite, so they are correct offline and populated
before the first frame settles.

### 2 · New Order

The whole job on one screen, in reading order:

**Customer card** — mobile number (large, `letterSpacing: 1.2`, phone keypad,
autofocused) and customer name.

- On the 10th digit the app looks the number up in local SQLite. A hit fills
  the name, marks the shop with a green tick, and dismisses the keyboard so the
  salesman is looking at products.
- A miss moves the cursor into the name field — the only thing left to type.
- Changing the number clears an auto-filled name but never a hand-typed one.

**Search field** — filters as each letter lands. `good` → Good Day. `milk` →
Milk Bikis. Words can be typed in any order; the SKU is searchable too.

**Product cards** — image, name, MRP, box price, `[−] qty [+]`, line total.

- Tapping the quantity itself opens a keypad — 40 boxes should not be 40 taps.
- A card with a quantity gets a green border, so the order is scannable while
  scrolling.
- Haptic tick on every step, which is how the salesman knows a tap registered
  without looking.

**Summary bar** — pinned to the bottom: Products · Boxes · Grand Total, and
**💾 Save Order & Next Customer**. The button is disabled until the order is
bookable (valid number, a name, at least one box), which removes the whole
class of "saved an empty order" without a single dialog.

On save: the order is written, the fields clear, the list scrolls to top, the
number field refocuses, and a 1.4-second snackbar confirms
`Sri Stores · 12 boxes saved`. The next shop can start immediately.

### 3 · Today's Orders

List of the day's orders — customer name, mobile, boxes, time, order value, and
a sync chip if the order has not reached the server yet. Search by name or
number. Tapping an order opens a sheet with its lines, plus **Edit** and
**Delete**.

Editing reopens the New Order screen pre-filled. An edited order goes back into
the outbox, so the server and the load sheet stay in step. Deleting is a soft
delete — the row survives for audit but leaves every list, stat and load sheet.

### 4 · Reports

Date-selectable, computed on the device so it works with no signal.

- Four headline numbers: Orders · Customers · Boxes · Sales Value.
- **Load Sheet — Product Wise**: boxes per product, most boxes first, with a
  total row. This is the number the warehouse actually needs, and there is an
  Excel button directly on it.
- **Top Customers**: by order value.
- **Salesman Summary**: this device's totals. The consolidated all-salesmen
  view is the admin's, from the server — a device only holds its own orders,
  and the report says so rather than implying otherwise.

### 5 · Settings

Deliberately thin: salesman code, server address, sync panel (status, last
sync, *Sync now*, *Retry failed*), and a read-only product catalogue with
prices. A notice explains that prices are set by admin on the server — so two
salesmen can never quote different prices for the same box.

---

## Visual system

| Token | Value |
|---|---|
| Primary green | `#1E7D3A` (matches the Ecoo Basket brand) |
| Dark green | `#145A32` — totals and emphasis |
| Secondary blue | `#1B4FA0` — informational, sync activity |
| Warning amber | `#9A6700` — offline and pending sync |
| Destructive | `#B3261E` — delete only |
| Background | `#F6F8F7`, cards pure white |
| Card radius | 20dp, 1px `#E6EBE8` border, no shadow |
| Minimum tap target | 56dp for buttons, 44dp for steppers |
| Type | System font. Google Fonts was deliberately not used — it fetches font files at first paint, which is the wrong trade for an offline-first app with a 2-second launch budget. |

Material 3 throughout, seeded from the brand green.

---

## Decisions worth recording

**No debounce on product search.** Filtering the in-memory catalogue costs
microseconds; a 150ms debounce would be pure added latency and would feel
laggier than no debounce at all.

**Totals are maintained incrementally, not recomputed.** Each `+` tap adjusts
the running total by one line rather than folding all lines. A unit test
asserts the incremental figure always equals an honest recount, so the
shortcut cannot silently drift.

**Prices are copied onto the order, not referenced.** An order is a record of
what was agreed in the shop, not a live query against today's price list.

**Soft delete, not hard delete.** A load sheet that silently loses rows is
worse than one showing a cancelled order.

**Export blocks on pending sync.** Exporting while orders sit in the outbox
would hand the warehouse an incomplete load sheet, so the app pushes first and
says it is doing so.

**Server address is a setting, not a build constant.** Distributors move
hosting; a field device should not need a new APK for that. It does require a
restart to take effect, which is the trade for reading config once at startup
instead of making every provider watch it.

---

## Deliberately excluded

Login · invoices · billing · GST · tax · addresses · payment collection ·
ledgers · accounting · delivery tracking · complex settings.

Each of these adds fields to the booking path. The app is measured in seconds
per shop, and none of them earn their seconds.
