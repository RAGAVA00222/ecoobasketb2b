from __future__ import annotations

import os
import tempfile
from pathlib import Path

import pytest

TMP_DB = Path(tempfile.gettempdir()) / "ecoo_test.db"
if TMP_DB.exists():
    TMP_DB.unlink()

# Must be set before app.config is first imported.
os.environ["DATABASE_URL"] = f"sqlite:///{TMP_DB}"
os.environ["ADMIN_API_KEY"] = "test-admin-key"
os.environ["TIMEZONE"] = "Asia/Kolkata"

from fastapi.testclient import TestClient  # noqa: E402

from app.db import Base, engine  # noqa: E402
from app.main import app  # noqa: E402


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


@pytest.fixture()
def admin_headers():
    return {"X-Admin-Key": "test-admin-key"}


@pytest.fixture()
def catalogue(client, admin_headers):
    """Two products, priced in paise: ₹920/box and ₹880/box."""
    a = client.post(
        "/api/v1/products",
        headers=admin_headers,
        json={
            "sku": "BIS-GDAY",
            "name": "Good Day Biscuit",
            "brand": "Britannia",
            "mrp_paise": 1000,
            "units_per_box": 90,
            "box_price_paise": 92000,
        },
    ).json()
    b = client.post(
        "/api/v1/products",
        headers=admin_headers,
        json={
            "sku": "BIS-MILKB",
            "name": "Milk Bikis",
            "brand": "Britannia",
            "mrp_paise": 1000,
            "units_per_box": 120,
            "box_price_paise": 88000,
        },
    ).json()
    return a, b
