"""Ecoo Basket price list — the distributor's live selling rates.

Rate sheet dated 04-Aug-2026.

Transcribed from the supplied rate sheet. One row per sellable line:

    (brand, product, mrp ₹/unit, units per box, Ecoo sell rate ₹/box)

MRP is per retail unit and is display-only — it tells the shopkeeper what the
packet sells for and never enters an order total. The box rate is what the shop
pays and what every total is computed from.

The per-unit rate on the sheet is deliberately NOT stored: it is exactly
box_rate / units_per_box, and keeping a third copy of the same number is how
three figures end up disagreeing. The API derives it.

Note that a product name alone is not unique — Milk Classic is sold as ₹10x120
and ₹20x60 — so SKUs are keyed on brand + product + MRP.

To add products later: append rows here and re-run `python seed.py`, or POST to
/api/v1/products with the admin key. Existing prices are never overwritten by
re-seeding unless --update is passed.
"""

from __future__ import annotations

# brand, product, mrp_rupees, units_per_box, box_rate_rupees
# box_rate_rupees of None means the rate sheet left the rate blank. Those lines
# are loaded but held INACTIVE — a box with no rate cannot be priced, and
# guessing one would put a wrong figure in front of a shopkeeper.
PRICE_LIST: list[tuple[str, str, float | None, int, float | None]] = [
    # ---- Britannia ----
    ("Britannia", "Milk Classic", 10, 120, 1060),
    ("Britannia", "Milk Classic", 20, 60, 930),
    ("Britannia", "Marie Gold", 5, 168, 730),
    ("Britannia", "Marie Gold", 10, 96, 840),
    ("Britannia", "Marie Gold", 40, 36, 1230),
    ("Britannia", "Marie Gold Set", 100, 10, 730),
    ("Britannia", "Milk Bikis", 5, 210, 945),
    ("Britannia", "Milk Bikis", 10, 120, 1070),
    ("Britannia", "Milk Bikis", 20, 54, 930),
    ("Britannia", "Good Day Cashew", 5, 180, 788),
    ("Britannia", "Good Day Cashew", 10, 90, 788),
    ("Britannia", "Good Day Choco Chip", 10, 72, 620),
    ("Britannia", "Good Day Pista Badam", 10, 72, 620),
    ("Britannia", "Bourbon", 10, 140, 1185),
    ("Britannia", "Jim Jam", 10, 120, 1030),
    ("Britannia", "Milk Cream", 10, 72, 625),
    ("Britannia", "Milk Creme", 30, 100, 2550),
    ("Britannia", "Rusk", 10, 64, 550),
    ("Britannia", "Rusk", 40, 32, 1030),
    ("Britannia", "Nutri Choice", 10, 96, 830),
    ("Britannia", "Nutri Choice", 25, 72, 1430),
    ("Britannia", "50-50 Classic", 5, 144, 620),
    ("Britannia", "50-50 Classic", 10, 108, 935),
    ("Britannia", "Maska Chaska", 10, 96, 825),
    ("Britannia", "Little Hearts", 5, 240, 1030),
    ("Britannia", "Little Hearts", 10, 120, 1032),
    ("Britannia", "Treat Choco", 10, 80, 688),
    ("Britannia", "Treat Vanilla", 10, 80, 688),
    # ---- Nestle ----
    ("Nestle", "Maggi", 15, 96, 1270),
    # The rate sheet files Yippee under Nestle; it is an ITC brand. Left as
    # supplied — re-file it here if the sheet was the typo.
    ("Nestle", "Yippee", 15, 96, None),
    # ---- Nabati ----
    ("Nabati", "Nabati Choco", 10, 144, 1150),
    ("Nabati", "Nabati Cheese", 10, 144, 1140),
    ("Nabati", "Nabati Strawberry", 10, 144, 1140),
    ("Nabati", "Nextar", 10, 144, None),
    # ---- Parle ----
    ("Parle", "Hide & Seek", 10, 160, 1318),
    ("Parle", "Hide & Seek", 30, 90, 1930),
    ("Parle", "Monaco", 10, 108, 885),
    ("Parle", "Krack Jack", 10, 108, 885),
    ("Parle", "Happy Happy", 5, 144, 590),
    ("Parle", "Happy Happy", 10, 96, 790),
    ("Parle", "Parle-G", 3, 144, 411),
    ("Parle", "Parle-G", 10, 72, 630),
    ("Parle", "Melody", 100, 24, 2040),
    # ---- ITC ----
    ("ITC", "Marie Light", 10, 72, 580),
    ("ITC", "Dark Fantasy", 10, 200, 1570),
    ("ITC", "Dark Fantasy", 40, 120, 3750),
    ("ITC", "Dark Fantasy Bourbon", 10, 120, 940),
    ("ITC", "Bourne Cream Choco", 5, 144, 570),
    ("ITC", "Bourne Cream Orange", 5, 144, 570),
    ("ITC", "Mom's Magic", 10, 84, None),
    # ---- PepsiCo ----
    ("PepsiCo", "7Up 750ml", 40, 24, 723),
    ("PepsiCo", "Pepsi 750ml", 40, 24, 723),
    ("PepsiCo", "Mirinda 750ml", 40, 24, 723),
    ("PepsiCo", "7Up 2.25L", 100, 9, 709),
    ("PepsiCo", "Pepsi 2.25L", 100, 9, 709),
    ("PepsiCo", "Mirinda 2.25L", 100, 9, 709),
    # Maaza is a Coca-Cola line; the sheet groups it under PepsiCo. Left as
    # supplied.
    ("PepsiCo", "Maaza 1.75L", 95, 12, 688),
    # ---- Daily Beverages: one MRP, one pack size, one rate ----
    ("Daily Beverages", "Orange", 12, 30, 193),
    ("Daily Beverages", "Apple", 12, 30, 193),
    ("Daily Beverages", "Paneer Soda", 12, 30, 193),
    ("Daily Beverages", "Lime", 12, 30, 193),
    ("Daily Beverages", "Mango", 12, 30, 193),
    ("Daily Beverages", "Cola", 12, 30, 193),
    ("Daily Beverages", "Jeera", 12, 30, 193),
]

SALESMEN = [
    ("SM01", "Salesman 1"),
    ("SM02", "Salesman 2"),
    ("SM03", "Salesman 3"),
]

# Short, stable prefixes so SKUs stay readable on a printed load sheet.
BRAND_CODES = {
    "Britannia": "BRIT",
    "Nestle": "NEST",
    "Nabati": "NABA",
    "Parle": "PARL",
    "ITC": "ITC",
    "PepsiCo": "PEP",
    "Daily Beverages": "DAILY",
}


def brand_code(brand: str) -> str:
    if brand in BRAND_CODES:
        return BRAND_CODES[brand]
    return "".join(ch for ch in brand.upper() if ch.isalnum())[:5] or "GEN"


def make_sku(brand: str, product: str, mrp_rupees: float | None) -> str:
    """brand + product + MRP. Stable across re-seeds, which is what lets the
    seed be re-run without creating duplicate rows."""
    slug = "".join(ch for ch in product.upper() if ch.isalnum())[:18]
    mrp = "NA" if mrp_rupees is None else f"{mrp_rupees:g}"
    return f"{brand_code(brand)}-{slug}-{mrp}"


def rows() -> list[dict]:
    """The price list as product records, with SKUs and sort order applied.

    A line with no box rate is returned inactive with a rate of zero, so it
    exists in the catalogue for admin to price but can never be sold at a
    guessed figure.
    """
    out = []
    for position, (brand, product, mrp, units, box_rate) in enumerate(PRICE_LIST):
        out.append(
            {
                "sku": make_sku(brand, product, mrp),
                "name": product,
                "brand": brand,
                "mrp_paise": 0 if mrp is None else round(mrp * 100),
                "units_per_box": units,
                "box_price_paise": 0 if box_rate is None else round(box_rate * 100),
                "active": box_rate is not None,
                # Keeps the app's list in rate-sheet order, which is the order
                # the salesman already knows.
                "sort_order": position,
            }
        )
    return out


def unpriced() -> list[str]:
    """SKUs the rate sheet left without a box rate."""
    return [r["sku"] for r in rows() if not r["active"]]
