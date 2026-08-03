# Ecoo Basket — FMCG Order Booking App

A field-sales order booking app for FMCG distributors. A salesman walks into a
shop, types the mobile number, taps quantities against product cards, and saves.
At the end of the day the admin exports one Excel file containing every order
plus a product-wise load sheet for the warehouse.

**It is not a billing app.** There is no invoice, no GST, no tax, no address, no
payment collection, no ledger, no delivery module and no login screen. Those
omissions are the product, not gaps in it.

```
apps/order-booking/
├── mobile/     Flutter app (Android), offline-first, Riverpod + SQLite
└── server/     FastAPI + PostgreSQL, Excel export via OpenXML (openpyxl)
```

This subtree is independent of the Next.js marketing site at the repository
root; it shares nothing but the repo and the brand palette.

---

## The 45-second order

| Step | What the salesman does | What the app does |
|---|---|---|
| 1 | Opens the app | Dashboard is on screen — no login, no splash gate |
| 2 | Taps **New Order** | Number field is already focused, keypad up |
| 3 | Types the mobile number | On the 10th digit, a local SQLite lookup fills the name |
| 4 | Types the name *(new shops only)* | Cursor is already in the name field |
| 5 | Types 3–4 letters of a product | List filters as the letters land |
| 6 | Taps `+` / `−`, or the number for a keypad | Line total and grand total update on the same frame |
| 7 | Taps **Save Order & Next Customer** | Order is written to SQLite, fields clear, number field refocuses |

No confirmation dialog, no review screen, no "are you sure". The one place the
app does ask is deleting an already-booked order.

---

## Running it

### Server

```bash
cd apps/order-booking/server
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env          # then edit it
export $(grep -v '^#' .env | xargs)

python seed.py                # demo catalogue; replace with the real price list
uvicorn app.main:app --reload --port 8000
```

Interactive API docs at `http://localhost:8000/docs`.

With no `DATABASE_URL` set it falls back to a local SQLite file, which is enough
to run the app end to end on one machine. Point it at PostgreSQL for anything
real.

Tests:

```bash
cd apps/order-booking/server
pip install pytest httpx
python -m pytest tests -q     # 13 tests
```

### App

```bash
cd apps/order-booking/mobile

# One-time: generate the Android platform shell (android/, gradle files).
# Only lib/, test/, pubspec.yaml and analysis_options.yaml are checked in.
flutter create --platforms=android --project-name ecoo_order_booking .

flutter pub get
flutter run --dart-define=ECOO_API_BASE_URL=http://10.0.2.2:8000
flutter test
```

`10.0.2.2` is how the Android emulator reaches the host machine. On a real
device use the LAN or public address of the server. The address is also
editable in-app under **Settings → Server address**, which is how devices get
pointed at production after install.

After `flutter create`, add to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

`INTERNET` is for sync and Excel download; `ACCESS_NETWORK_STATE` is what
`connectivity_plus` reads to notice the phone coming back into signal.

---

## Architecture

### Offline first, not offline tolerant

Every screen reads from the device's SQLite database. The network is only ever
a background job that fills that database and drains an outbox. A salesman
inside a concrete godown with no bars sees exactly the same app as one standing
in the street.

```
save order ──► SQLite (durable)     ──► UI clears, next customer
                  │
                  └─► outbox ──► POST /orders/sync ──► PostgreSQL ──► Excel
```

The save path touches no network at all. Sync is fire-and-forget: it runs on a
3-minute timer, on every connectivity change, and immediately after each save.

**Idempotent by construction.** Every order gets a UUID on the device before it
is ever transmitted. The sync endpoint upserts on that UUID, so a retry after a
dropped connection returns the original order rather than booking a second one.
Each order in a batch is committed separately, so one bad row (a product this
device knows and the server does not) cannot block the other forty.

Status is surfaced as exactly three words in one pill: **Offline** /
**Pending sync · N** / **Synced**. Tapping it forces a sync.

### Money

Integer paise everywhere — device, wire, database. Order totals get summed on
the phone, again on the server and a third time in Excel; floats would disagree
in the last decimal between those three, and a load sheet that does not foot is
a load sheet nobody trusts. Display formatting uses Indian lakh grouping
(`₹1,23,456`, not `₹123,456`).

### Prices

Line prices are snapshotted onto the order at booking time. When admin
re-prices a product next week, last week's orders keep last week's price.

The field app can read prices but never write them. There is no admin key on a
salesman's phone, so a device cannot invent a discount. Catalogue edits go
through `POST/PATCH /api/v1/products` with an `X-Admin-Key` header.

### Where each number is computed

| Number | Computed by | Why |
|---|---|---|
| Line total, order total | Device, then re-derived by the server | The device needs it instantly; the server must not trust it |
| Today's dashboard stats | SQLite, one aggregate query | Works offline |
| Load sheet (product-wise boxes) | SQLite on device *and* SQL on server | Salesman sees their own; admin sees everyone's |
| Excel workbook | Server (openpyxl) | Consolidated across all salesmen; no battery spent on the phone |

---

## Performance

| Budget | How it is met |
|---|---|
| Launch < 2s | No login, no token refresh, no catalogue download on the launch path. Startup is: open SQLite, read two settings rows, paint. Sync starts after the first frame. |
| Save < 1s | One SQLite transaction (header + lines), then return. WAL journaling keeps the write from queueing behind a background catalogue sync. No network on the path. |
| Search < 100ms | The active catalogue lives in memory with a pre-lowercased search index per product. A keystroke is one linear pass with no allocation and no query — microseconds at a few hundred SKUs. No debounce, because the delay would be slower than the work. |
| Smooth on low-end devices | Each product card watches only its own quantity (`select`), so a `+` tap repaints one card instead of the list. Images are decoded at display size, not source size. |

---

## API

Base path `/api/v1`. Money fields are integer paise.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/products?updated_since=` | Catalogue, full or delta |
| `POST` `PATCH` `DELETE` | `/products`, `/products/{id}` | Admin only (`X-Admin-Key`); delete deactivates |
| `GET` | `/customers/lookup?mobile=` | Mobile → name |
| `GET` `POST` | `/customers` | List/delta, upsert |
| `POST` | `/orders` | Book one order |
| `POST` | `/orders/sync` | Batch push from a device, per-order results |
| `GET` `PATCH` `DELETE` | `/orders`, `/orders/{id}` | List/search by day, edit, soft delete |
| `GET` | `/reports/summary?on=` | Orders, customers, boxes, value + product/customer/salesman splits |
| `GET` | `/reports/load-sheet?on=` | Product-wise box totals |
| `GET` | `/export/orders.xlsx?on=` | The workbook |

Mobile numbers are normalised server-side and on-device: `+91 98765 43210`,
`09876543210` and `9876543210` are all one shop.

### The workbook

Three sheets, from one click:

- **Orders** — one row per order line: Date, Customer Name, Mobile Number,
  Product Name, MRP, Box Price, Quantity, Line Total, Grand Total, Salesman
  Name. The order's grand total sits on its first line only, so `SUM()` over
  the column is correct.
- **Load Sheet** — product-wise box totals, most boxes first. This is what goes
  to the warehouse or supplier as a consolidated purchase order.
- **Summary** — day totals and a salesman breakdown.

Money is written as real numbers with a rupee number format, not as
pre-formatted text, so the admin can pivot and re-total in Excel.

---

## What is checked in, and what is not

Checked in: all Dart source and tests, all Python source and tests, the seed
script, and this documentation.

Not checked in: the Flutter `android/` platform shell (regenerate with
`flutter create`, see above) and `pubspec.lock`. Product images are expected in
cloud storage — the API stores and serves URLs only, and the app caches them
on device.

The Flutter code has not been compiled in this environment (no Dart toolchain
available here); the Python test suite has been run and passes.
