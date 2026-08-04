"""Load the distributor's price list into the catalogue.

    python seed.py             # add missing products, never touch live prices
    python seed.py --update    # also re-apply prices from price_list.py
    python seed.py --reset     # wipe the catalogue and rebuild it

Re-running is safe: rows are matched on SKU, which is derived from brand +
product + MRP and so is stable across runs.

To add products later, append rows to price_list.py and re-run, or POST to
/api/v1/products with the admin key.
"""

from __future__ import annotations

import argparse

from sqlalchemy import select

from app.db import SessionLocal, init_db
from app.models import Product, Salesman
from price_list import SALESMEN, rows


def seed(reset: bool = False, update: bool = False) -> None:
    init_db()
    with SessionLocal() as db:
        if reset:
            db.query(Product).delete()
            db.commit()

        existing = {p.sku: p for p in db.scalars(select(Product))}
        added = repriced = 0

        for record in rows():
            current = existing.get(record["sku"])
            if current is None:
                db.add(Product(**record))
                added += 1
                continue
            if not update:
                continue
            # A live price is only ever overwritten when explicitly asked for —
            # a stray re-seed must not silently re-price the field.
            changed = (
                current.box_price_paise != record["box_price_paise"]
                or current.mrp_paise != record["mrp_paise"]
                or current.units_per_box != record["units_per_box"]
                or current.brand != record["brand"]
            )
            if changed:
                for field, value in record.items():
                    setattr(current, field, value)
                repriced += 1

        have = {s.code for s in db.scalars(select(Salesman))}
        for code, name in SALESMEN:
            if code not in have:
                db.add(Salesman(code=code, name=name))

        db.commit()
        total = db.query(Product).count()
        print(f"catalogue: {total} products ({added} added, {repriced} re-priced)")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset", action="store_true", help="wipe products first")
    parser.add_argument(
        "--update", action="store_true", help="re-apply prices to existing SKUs"
    )
    seed(**vars(parser.parse_args()))
