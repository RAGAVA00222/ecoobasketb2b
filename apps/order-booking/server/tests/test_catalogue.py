"""The catalogue's new dimensions: brand, pack size and the derived unit rate."""

from price_list import PRICE_LIST, make_sku, rows, unpriced


def test_the_price_list_has_no_duplicate_skus():
    # SKU is brand + product + MRP. If two rows collide, one silently
    # overwrites the other on seed and a product vanishes from the app.
    skus = [r["sku"] for r in rows()]
    assert len(skus) == len(set(skus))


def test_sku_separates_the_same_product_at_different_pack_sizes():
    # Milk Classic is sold as ₹10x120 and ₹20x60. They are different lines
    # with different prices and must never merge.
    assert make_sku("Britannia", "Milk Classic", 10) != make_sku(
        "Britannia", "Milk Classic", 20
    )


def test_every_sellable_row_prices_a_whole_box():
    for record in rows():
        assert record["units_per_box"] >= 1, record["sku"]
        if record["active"]:
            assert record["box_price_paise"] > 0, record["sku"]


def test_a_line_with_no_rate_is_held_back_rather_than_guessed():
    # The 04-Aug sheet leaves Yippee, Nextar and Mom's Magic without a box
    # rate. A guessed rate would go straight into a real order total, so those
    # lines load inactive and never reach a salesman until admin prices them.
    held = unpriced()
    assert set(held) == {"NEST-YIPPEE-15", "NABA-NEXTAR-10", "ITC-MOMSMAGIC-10"}
    for record in rows():
        if record["sku"] in held:
            assert record["box_price_paise"] == 0
            assert record["active"] is False


def test_the_derived_unit_rate_matches_the_rate_sheet():
    # Spot-checks against the distributor's own per-unit column.
    expected = {
        "BRIT-MILKCLASSIC-10": 883,   # ₹1,060 / 120
        "BRIT-MARIEGOLD-5": 435,      # ₹730 / 168
        "ITC-DARKFANTASY-40": 3125,   # ₹3,750 / 120
        "DAILY-JEERA-12": 643,        # ₹193 / 30
        "PARL-PARLEG-3": 285,         # ₹411 / 144
    }
    by_sku = {r["sku"]: r for r in rows()}
    for sku, unit_paise in expected.items():
        record = by_sku[sku]
        derived = round(record["box_price_paise"] / record["units_per_box"])
        assert derived == unit_paise, sku


def test_maaza_now_carries_the_mrp_the_revised_sheet_supplies():
    # The first sheet left this blank; the 04-Aug sheet prices it at ₹95.
    maaza = next(r for r in rows() if "MAAZA" in r["sku"])
    assert maaza["mrp_paise"] == 9500
    assert maaza["box_price_paise"] == 68800
    assert maaza["active"] is True


def test_the_catalogue_is_served_in_rate_sheet_order(client, admin_headers):
    assert [r["sort_order"] for r in rows()] == list(range(len(PRICE_LIST)))


def test_the_api_derives_the_unit_rate(client, admin_headers):
    client.post(
        "/api/v1/products",
        headers=admin_headers,
        json={
            "sku": "BRIT-TEST-10",
            "name": "Milk Classic",
            "brand": "Britannia",
            "mrp_paise": 1000,
            "units_per_box": 120,
            "box_price_paise": 106700,
        },
    )
    product = client.get("/api/v1/products").json()[0]
    assert product["unit_price_paise"] == 889
    assert product["brand"] == "Britannia"
    assert product["units_per_box"] == 120


def test_the_load_sheet_carries_the_brand_for_supplier_purchase_orders(
    client, catalogue
):
    a, _ = catalogue
    client.post(
        "/api/v1/orders",
        json={
            "client_uuid": "uuid-brand-0001",
            "mobile": "9876543210",
            "customer_name": "Sri Stores",
            "items": [{"product_id": a["id"], "qty_boxes": 4}],
        },
    )
    line = client.get("/api/v1/reports/load-sheet").json()["lines"][0]
    assert line["brand"] == "Britannia"
    assert line["total_boxes"] == 4


def test_seeding_a_revised_sheet_retires_superseded_skus(tmp_path, monkeypatch):
    """A rename or an MRP change mints a new SKU. The old row must be
    deactivated, or the salesman sees one product twice at two prices."""
    import seed as seed_module
    from app.models import Product

    with seed_module.SessionLocal() as db:
        db.query(Product).delete()
        db.add(
            Product(
                sku="BRIT-BOURBON-20",  # the sheet now lists Bourbon at ₹10
                name="Bourbon",
                brand="Britannia",
                mrp_paise=2000,
                units_per_box=140,
                box_price_paise=119000,
            )
        )
        db.commit()

    seed_module.seed(update=True)

    with seed_module.SessionLocal() as db:
        stale = db.query(Product).filter_by(sku="BRIT-BOURBON-20").one()
        current = db.query(Product).filter_by(sku="BRIT-BOURBON-10").one()
        assert stale.active is False, "superseded row must not stay sellable"
        assert current.active is True
        assert current.box_price_paise == 118500
