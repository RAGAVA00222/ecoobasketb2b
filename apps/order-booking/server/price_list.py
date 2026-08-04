"""Ecoo Basket price list — the distributor's live selling rates.

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
# mrp_rupees of None means the rate sheet left it blank.
PRICE_LIST: list[tuple[str, str, float | None, int, float]] = [
    # ---- Britannia ----
    ("Britannia", "Milk Classic", 10, 120, 1067),
    ("Britannia", "Milk Classic", 20, 60, 945),
    ("Britannia", "Marie Gold", 10, 96, 840),
    ("Britannia", "Marie Gold", 5, 168, 738),
    ("Britannia", "Milk Bikis", 10, 120, 1070),
    ("Britannia", "Milk Bikis", 5, 210, 797),
    ("Britannia", "Good Day Cashew", 10, 90, 795),
    ("Britannia", "Good Day Cashew", 5, 180, 795),
    ("Britannia", "Bourbon", 20, 140, 1190),
    ("Britannia", "Jim Jam", 10, 120, 1038),
    ("Britannia", "Milk Cream", 10, 72, 627),
    ("Britannia", "Good Day Choco Chip", 10, 72, 625),
    ("Britannia", "Good Day Pista Badam", 10, 72, 625),
    ("Britannia", "Marie Gold Set", 100, 10, 740),
    ("Britannia", "Rusk", 10, 64, 560),
    ("Britannia", "Rusk", 40, 32, 1042),
    ("Britannia", "Marie Gold", 40, 36, 1220),
    ("Britannia", "Nutri Choice", 10, 96, 834),
    ("Britannia", "Nutri Choice", 25, 72, 1459),
    ("Britannia", "50-50 Classic", 5, 144, 625),
    ("Britannia", "50-50 Classic", 10, 108, 935),
    ("Britannia", "Maska Chaska", 10, 96, 834),
    ("Britannia", "Milk Creme", 30, 100, 2550),
    ("Britannia", "Little Hearts", 10, 120, 1032),
    ("Britannia", "Little Hearts", 5, 240, 1030),
    ("Britannia", "Treat - Choco", 10, 80, 692),
    ("Britannia", "Treat - Vanilla", 10, 80, 692),
    ("Britannia", "Milk Bikis", 20, 54, 934),
    # ---- Nestle ----
    ("Nestle", "Maggi", 15, 96, 1275),
    # The rate sheet files Yippee under Nestle; it is an ITC brand. Left as
    # supplied — re-file it in this list if the sheet was the typo.
    ("Nestle", "Yippee", 15, 96, 1245),
    # ---- Nabati ----
    ("Nabati", "Nabati - Choco", 10, 144, 1157),
    ("Nabati", "Nabati - Cheese", 10, 144, 1157),
    ("Nabati", "Nabati - Strawberry", 10, 144, 1157),
    ("Nabati", "Nextar", 10, 144, 1160),
    # ---- Parle ----
    ("Parle", "Hide and Seek", 10, 160, 1328),
    ("Parle", "Hide and Seek", 30, 90, 1930),
    ("Parle", "Monaco", 10, 108, 889),
    ("Parle", "Krack Jack", 10, 108, 889),
    ("Parle", "Happy Happy", 5, 144, 595),
    ("Parle", "Happy Happy", 10, 96, 790),
    ("Parle", "Parle-G", 3, 144, 411),
    ("Parle", "Parle-G", 10, 72, 630),
    ("Parle", "Melody", 100, 24, 2050),
    # ---- ITC ----
    ("ITC", "Marie Light", 10, 72, 585),
    ("ITC", "Dark Fantasy", 10, 200, 1585),
    ("ITC", "Dark Fantasy", 40, 120, 3750),
    ("ITC", "Bourne Cream - Choco", 5, 144, 575),
    ("ITC", "Bourne Cream - Orange", 5, 144, 575),
    ("ITC", "Dark Fantasy Bourbon", 10, 120, 940),
    ("ITC", "Mom's Magic", 10, 84, 670),
    # ---- Cool drinks: PepsiCo ----
    ("Cool Drinks - PEPSICO", "7Up 750 ml", 40, 24, 723),
    ("Cool Drinks - PEPSICO", "Pepsi 750 ml", 40, 24, 723),
    ("Cool Drinks - PEPSICO", "Mirinda 750 ml", 40, 24, 723),
    ("Cool Drinks - PEPSICO", "7Up 2.25 L", 100, 9, 709),
    ("Cool Drinks - PEPSICO", "Pepsi 2.25 L", 100, 9, 709),
    ("Cool Drinks - PEPSICO", "Mirinda 2.25 L", 100, 9, 709),
    # MRP is blank on the rate sheet for this line. It is sellable regardless —
    # the box rate is what the order is priced on — so it ships with MRP unset
    # and the app hides the MRP chip rather than showing a false ₹0.
    ("Cool Drinks - PEPSICO", "Maaza 1.75 L", None, 12, 688),
    # ---- Cool drinks: Daily ----
    ("Cool Drinks - Daily", "Orange", 12, 30, 195),
    ("Cool Drinks - Daily", "Apple", 12, 30, 195),
    ("Cool Drinks - Daily", "Paneer Soda", 12, 30, 195),
    ("Cool Drinks - Daily", "Lime", 12, 30, 195),
    ("Cool Drinks - Daily", "Mango", 12, 30, 195),
    ("Cool Drinks - Daily", "Cola", 12, 30, 195),
    ("Cool Drinks - Daily", "Jeera", 12, 30, 195),
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
    "Cool Drinks - PEPSICO": "PEP",
    "Cool Drinks - Daily": "DAILY",
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
    """The price list as product records, with SKUs and sort order applied."""
    out = []
    for position, (brand, product, mrp, units, box_rate) in enumerate(PRICE_LIST):
        out.append(
            {
                "sku": make_sku(brand, product, mrp),
                "name": product,
                "brand": brand,
                "mrp_paise": 0 if mrp is None else round(mrp * 100),
                "units_per_box": units,
                "box_price_paise": round(box_rate * 100),
                # Keeps the app's list in rate-sheet order, which is the order
                # the salesman already knows.
                "sort_order": position,
            }
        )
    return out
