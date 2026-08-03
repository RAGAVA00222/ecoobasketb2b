"""Database models.

Money is stored as integer paise everywhere — DB, API payloads and the
on-device SQLite mirror. Order totals are summed on three different machines
(phone, server, spreadsheet) and floats would drift between them.

Prices are snapshotted onto every order line. When admin re-prices a product
next week, last week's booked orders must not silently re-price with it.
"""

from __future__ import annotations

from datetime import date, datetime, timezone

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    String,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Salesman(Base):
    __tablename__ = "salesmen"

    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(16), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(80))
    phone: Mapped[str | None] = mapped_column(String(15), default=None)
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)


class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True)
    # The mobile number is the customer's identity. No address, no GST.
    mobile: Mapped[str] = mapped_column(String(15), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(120))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, onupdate=_utcnow
    )


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)
    sku: Mapped[str] = mapped_column(String(40), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(120))
    image_url: Mapped[str | None] = mapped_column(String(500), default=None)
    mrp_paise: Mapped[int] = mapped_column(Integer)
    box_price_paise: Mapped[int] = mapped_column(Integer)
    active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, onupdate=_utcnow, index=True
    )


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    # Generated on the device before the row ever reaches the network. This is
    # what makes sync idempotent: a retried push can never double-book.
    client_uuid: Mapped[str] = mapped_column(String(36), unique=True, index=True)
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"), index=True)
    salesman_id: Mapped[int | None] = mapped_column(
        ForeignKey("salesmen.id"), default=None, index=True
    )
    order_date: Mapped[date] = mapped_column(Date, index=True)
    booked_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    total_products: Mapped[int] = mapped_column(Integer, default=0)
    total_boxes: Mapped[int] = mapped_column(Integer, default=0)
    total_value_paise: Mapped[int] = mapped_column(Integer, default=0)
    is_deleted: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, onupdate=_utcnow
    )

    customer: Mapped[Customer] = relationship(lazy="joined")
    salesman: Mapped[Salesman | None] = relationship(lazy="joined")
    items: Mapped[list["OrderItem"]] = relationship(
        back_populates="order",
        cascade="all, delete-orphan",
        lazy="selectin",
        order_by="OrderItem.id",
    )


Index("ix_orders_date_deleted", Order.order_date, Order.is_deleted)


class OrderItem(Base):
    __tablename__ = "order_items"
    __table_args__ = (UniqueConstraint("order_id", "product_id", name="uq_order_product"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(
        ForeignKey("orders.id", ondelete="CASCADE"), index=True
    )
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), index=True)
    # Snapshot of the product at booking time.
    product_name: Mapped[str] = mapped_column(String(120))
    mrp_paise: Mapped[int] = mapped_column(Integer)
    box_price_paise: Mapped[int] = mapped_column(Integer)
    qty_boxes: Mapped[int] = mapped_column(Integer)
    line_total_paise: Mapped[int] = mapped_column(Integer)

    order: Mapped[Order] = relationship(back_populates="items")
