"""The catalogue's new dimensions: brand, pack size and the derived unit rate."""

from price_list import PRICE_LIST, make_sku, rows


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


def test_every_row_prices_a_whole_box():
    for record in rows():
        assert record["box_price_paise"] > 0, record["sku"]
        assert record["units_per_box"] >= 1, record["sku"]


def test_the_derived_unit_rate_matches_the_rate_sheet():
    # Spot-checks against the distributor's own per-unit column.
    expected = {
        "BRIT-MILKCLASSIC-10": 889,   # ₹1,067 / 120
        "BRIT-MARIEGOLD-5": 439,      # ₹738 / 168
        "ITC-DARKFANTASY-40": 3125,   # ₹3,750 / 120
        "DAILY-JEERA-12": 650,        # ₹195 / 30
    }
    by_sku = {r["sku"]: r for r in rows()}
    for sku, unit_paise in expected.items():
        record = by_sku[sku]
        derived = round(record["box_price_paise"] / record["units_per_box"])
        assert derived == unit_paise, sku


def test_a_blank_mrp_is_stored_as_zero_not_guessed():
    # The rate sheet leaves Maaza's MRP empty. Inventing one would put a wrong
    # price in front of a shopkeeper; MRP is display-only so zero is safe.
    maaza = next(r for r in rows() if "MAAZA" in r["sku"])
    assert maaza["mrp_paise"] == 0
    assert maaza["box_price_paise"] == 68800


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
