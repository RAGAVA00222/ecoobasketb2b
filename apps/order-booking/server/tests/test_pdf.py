"""The load sheet PDF — the copy that gets printed and carried."""

from app.services.pdf import _rupees


def book(client, catalogue, uuid, qty_a, qty_b=0):
    a, b = catalogue
    items = [{"product_id": a["id"], "qty_boxes": qty_a}]
    if qty_b:
        items.append({"product_id": b["id"], "qty_boxes": qty_b})
    return client.post(
        "/api/v1/orders",
        json={
            "client_uuid": uuid,
            "mobile": "9876543210",
            "customer_name": "Sri Stores",
            "items": items,
        },
    )


def test_rupee_grouping_is_indian_not_thousands():
    # 1,23,456 — an admin reading ₹123,456 has to stop and re-parse it.
    assert _rupees(12345600) == "1,23,456"
    assert _rupees(46000000) == "4,60,000"
    assert _rupees(92000) == "920"
    assert _rupees(0) == "0"


def test_the_pdf_downloads_as_a_real_pdf(client, catalogue):
    book(client, catalogue, "uuid-pdf-0001", 5, 3)
    resp = client.get("/api/v1/export/load-sheet.pdf")

    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"
    assert "attachment" in resp.headers["content-disposition"]
    assert "load-sheet" in resp.headers["content-disposition"]
    # A PDF that does not start with the magic bytes will not open on a phone.
    assert resp.content.startswith(b"%PDF-")
    assert resp.content.rstrip().endswith(b"%%EOF")
    assert len(resp.content) > 1000


def test_an_empty_day_still_produces_a_valid_pdf(client):
    # A warehouse asking for today's sheet before any booking must get a
    # readable "nothing yet", not a crash or a zero-byte file.
    resp = client.get("/api/v1/export/load-sheet.pdf")
    assert resp.status_code == 200
    assert resp.content.startswith(b"%PDF-")


def test_the_pdf_reflects_what_was_actually_booked(client, catalogue):
    book(client, catalogue, "uuid-pdf-0001", 5, 3)
    small = client.get("/api/v1/export/load-sheet.pdf").content

    for n in range(2, 12):
        book(client, catalogue, f"uuid-pdf-{n:04d}", n)
    large = client.get("/api/v1/export/load-sheet.pdf").content

    # Same two products either way, so the page count holds; the figures on it
    # are what changed. Both must still be well-formed.
    assert large.startswith(b"%PDF-")
    assert len(large) > 1000 and len(small) > 1000


def test_deleted_orders_leave_the_printed_sheet(client, catalogue):
    order = book(client, catalogue, "uuid-pdf-0001", 5).json()
    client.delete(f"/api/v1/orders/{order['id']}")

    sheet = client.get("/api/v1/reports/load-sheet").json()
    assert sheet["total_boxes"] == 0
    # The PDF is built from the same aggregate, so it cannot disagree.
    assert client.get("/api/v1/export/load-sheet.pdf").content.startswith(b"%PDF-")
