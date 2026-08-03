"""Seed the catalogue with a demo FMCG range so a fresh install is usable
immediately. Replace with the distributor's real price list before go-live:

    python seed.py            # insert missing rows, leave existing prices alone
    python seed.py --reset    # drop and rebuild the catalogue
"""

from __future__ import annotations

import argparse

from sqlalchemy import select

from app.db import SessionLocal, init_db
from app.models import Product, Salesman

# (sku, name, mrp ₹, box price ₹)
DEMO_PRODUCTS: list[tuple[str, str, float, float]] = [
    ("BIS-GDAY-100", "Good Day Cashew Biscuit", 10, 920),
    ("BIS-MILKB-100", "Milk Bikis", 10, 880),
    ("BIS-JIMJAM-100", "Jim Jam Cream Biscuit", 10, 940),
    ("BIS-BOURB-150", "Bourbon Cream Biscuit", 20, 1180),
    ("BIS-MARIE-200", "Marie Gold", 30, 1240),
    ("BIS-PARLEG-100", "Parle-G Biscuit", 5, 620),
    ("BIS-TIGER-100", "Tiger Krunch", 10, 860),
    ("BIS-DFANT-150", "Dark Fantasy Choco Fills", 30, 1560),
    ("NOD-MAGGI-70", "Maggi Noodles 70g", 14, 1008),
    ("NOD-YIPP-70", "Yippee Magic Masala 70g", 15, 1080),
    ("SNK-LAYS-52", "Lays Classic Salted 52g", 20, 960),
    ("SNK-KURK-90", "Kurkure Masala Munch 90g", 20, 1000),
    ("SNK-BINGO-50", "Bingo Mad Angles 50g", 20, 940),
    ("BEV-BRU-50", "Bru Instant Coffee 50g", 165, 1980),
    ("BEV-REDL-250", "Red Label Tea 250g", 145, 1740),
    ("BEV-HORL-500", "Horlicks Classic 500g", 285, 3420),
    ("BEV-BOOST-450", "Boost Refill 450g", 265, 3180),
    ("STA-AATTA-5", "Aashirvaad Atta 5kg", 285, 2280),
    ("STA-FORT-1L", "Fortune Sunflower Oil 1L", 155, 2480),
    ("DAI-AMULB-100", "Amul Butter 100g", 62, 1488),
    ("HOM-SURF-1", "Surf Excel Easy Wash 1kg", 130, 1560),
    ("HOM-RIN-1", "Rin Detergent Bar 250g", 20, 960),
    ("HOM-VIM-500", "Vim Dishwash Gel 500ml", 115, 1380),
    ("PER-COLG-200", "Colgate Strong Teeth 200g", 115, 1380),
    ("PER-LIFE-125", "Lifebuoy Total Soap 125g", 42, 1008),
    ("PER-CLINIC-175", "Clinic Plus Shampoo 175ml", 115, 1380),
]

DEMO_SALESMEN = [
    ("SM01", "Ravi Kumar"),
    ("SM02", "Anand Raj"),
    ("SM03", "Suresh M"),
]


def seed(reset: bool = False) -> None:
    init_db()
    with SessionLocal() as db:
        if reset:
            db.query(Product).delete()
            db.commit()

        existing = {p.sku for p in db.scalars(select(Product))}
        added = 0
        for order, (sku, name, mrp, box_price) in enumerate(DEMO_PRODUCTS):
            if sku in existing:
                continue
            db.add(
                Product(
                    sku=sku,
                    name=name,
                    mrp_paise=round(mrp * 100),
                    box_price_paise=round(box_price * 100),
                    image_url=f"products/{sku.lower()}.webp",
                    sort_order=order,
                )
            )
            added += 1

        have = {s.code for s in db.scalars(select(Salesman))}
        for code, name in DEMO_SALESMEN:
            if code not in have:
                db.add(Salesman(code=code, name=name))

        db.commit()
        print(f"seeded: {added} new products, catalogue size {len(existing) + added}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset", action="store_true", help="wipe products first")
    seed(**vars(parser.parse_args()))
