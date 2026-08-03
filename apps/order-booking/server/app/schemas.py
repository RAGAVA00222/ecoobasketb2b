from __future__ import annotations

from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)


# --------------------------------------------------------------------------
# Customers
# --------------------------------------------------------------------------
class CustomerIn(BaseModel):
    mobile: str = Field(min_length=10, max_length=15)
    name: str = Field(min_length=1, max_length=120)

    @field_validator("mobile")
    @classmethod
    def normalise_mobile(cls, v: str) -> str:
        return normalise_mobile(v)

    @field_validator("name")
    @classmethod
    def strip_name(cls, v: str) -> str:
        return v.strip()


class CustomerOut(ORMModel):
    id: int
    mobile: str
    name: str
    updated_at: datetime


# --------------------------------------------------------------------------
# Products
# --------------------------------------------------------------------------
class ProductIn(BaseModel):
    sku: str = Field(min_length=1, max_length=40)
    name: str = Field(min_length=1, max_length=120)
    image_url: str | None = None
    mrp_paise: int = Field(ge=0)
    box_price_paise: int = Field(ge=0)
    active: bool = True
    sort_order: int = 0


class ProductPatch(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=120)
    image_url: str | None = None
    mrp_paise: int | None = Field(default=None, ge=0)
    box_price_paise: int | None = Field(default=None, ge=0)
    active: bool | None = None
    sort_order: int | None = None


class ProductOut(ORMModel):
    id: int
    sku: str
    name: str
    image_url: str | None
    mrp_paise: int
    box_price_paise: int
    active: bool
    sort_order: int
    updated_at: datetime


# --------------------------------------------------------------------------
# Orders
# --------------------------------------------------------------------------
class OrderItemIn(BaseModel):
    product_id: int
    qty_boxes: int = Field(gt=0)


class OrderIn(BaseModel):
    """What a device pushes. Totals are deliberately NOT accepted from the
    client — the server recomputes them from current product prices so a
    tampered or stale device can't invent an order value."""

    client_uuid: str = Field(min_length=8, max_length=36)
    mobile: str = Field(min_length=10, max_length=15)
    customer_name: str = Field(min_length=1, max_length=120)
    salesman_code: str | None = None
    booked_at: datetime | None = None
    items: list[OrderItemIn] = Field(min_length=1)

    @field_validator("mobile")
    @classmethod
    def normalise_mobile(cls, v: str) -> str:
        return normalise_mobile(v)


class OrderItemOut(ORMModel):
    product_id: int
    product_name: str
    mrp_paise: int
    box_price_paise: int
    qty_boxes: int
    line_total_paise: int


class OrderOut(ORMModel):
    id: int
    client_uuid: str
    customer_id: int
    customer_name: str
    customer_mobile: str
    salesman_name: str | None
    order_date: date
    booked_at: datetime
    total_products: int
    total_boxes: int
    total_value_paise: int
    items: list[OrderItemOut]


class SyncResult(BaseModel):
    client_uuid: str
    status: str  # "created" | "duplicate" | "rejected"
    order_id: int | None = None
    detail: str | None = None


class SyncResponse(BaseModel):
    results: list[SyncResult]
    server_time: datetime


# --------------------------------------------------------------------------
# Reports
# --------------------------------------------------------------------------
class ProductLine(BaseModel):
    product_id: int
    product_name: str
    total_boxes: int
    total_value_paise: int


class CustomerLine(BaseModel):
    customer_id: int
    customer_name: str
    mobile: str
    orders: int
    total_boxes: int
    total_value_paise: int


class SalesmanLine(BaseModel):
    salesman_code: str
    salesman_name: str
    orders: int
    total_boxes: int
    total_value_paise: int


class ReportSummary(BaseModel):
    from_date: date
    to_date: date
    total_orders: int
    total_customers: int
    total_boxes: int
    total_value_paise: int
    product_wise: list[ProductLine]
    customer_wise: list[CustomerLine]
    salesman_wise: list[SalesmanLine]


class LoadSheet(BaseModel):
    from_date: date
    to_date: date
    total_boxes: int
    lines: list[ProductLine]


def normalise_mobile(raw: str) -> str:
    """Keep digits only and drop the +91 / 0 prefixes salesmen type by habit,
    so the same shop is never stored twice under two spellings."""
    digits = "".join(ch for ch in raw if ch.isdigit())
    if len(digits) == 12 and digits.startswith("91"):
        digits = digits[2:]
    elif len(digits) == 11 and digits.startswith("0"):
        digits = digits[1:]
    if len(digits) < 10:
        raise ValueError("mobile number must have at least 10 digits")
    return digits
