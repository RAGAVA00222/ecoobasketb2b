from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import models, schemas
from .clock import to_local_date


class OrderRejected(Exception):
    def __init__(self, detail: str) -> None:
        super().__init__(detail)
        self.detail = detail


def get_or_create_customer(db: Session, mobile: str, name: str) -> models.Customer:
    customer = db.scalar(select(models.Customer).where(models.Customer.mobile == mobile))
    if customer is None:
        customer = models.Customer(mobile=mobile, name=name.strip())
        db.add(customer)
        db.flush()
    elif name.strip() and name.strip() != customer.name:
        # The salesman is standing in the shop; treat what they typed as the
        # freshest truth about the shop's name.
        customer.name = name.strip()
    return customer


def create_order(db: Session, payload: schemas.OrderIn) -> tuple[models.Order, bool]:
    """Returns (order, created). Idempotent on client_uuid so a retried sync
    after a flaky signal returns the original order instead of a duplicate."""
    existing = db.scalar(
        select(models.Order).where(models.Order.client_uuid == payload.client_uuid)
    )
    if existing is not None:
        return existing, False

    merged: dict[int, int] = {}
    for item in payload.items:
        merged[item.product_id] = merged.get(item.product_id, 0) + item.qty_boxes

    products = {
        p.id: p
        for p in db.scalars(
            select(models.Product).where(models.Product.id.in_(merged.keys()))
        )
    }
    missing = sorted(set(merged) - set(products))
    if missing:
        raise OrderRejected(f"unknown product_id(s): {missing}")

    salesman = None
    if payload.salesman_code:
        salesman = db.scalar(
            select(models.Salesman).where(models.Salesman.code == payload.salesman_code)
        )
        if salesman is None:
            salesman = models.Salesman(
                code=payload.salesman_code, name=payload.salesman_code
            )
            db.add(salesman)
            db.flush()

    customer = get_or_create_customer(db, payload.mobile, payload.customer_name)
    booked_at = payload.booked_at or datetime.now(timezone.utc)
    if booked_at.tzinfo is None:
        booked_at = booked_at.replace(tzinfo=timezone.utc)

    order = models.Order(
        client_uuid=payload.client_uuid,
        customer_id=customer.id,
        salesman_id=salesman.id if salesman else None,
        order_date=to_local_date(booked_at),
        booked_at=booked_at,
    )

    total_boxes = 0
    total_value = 0
    for product_id, qty in merged.items():
        product = products[product_id]
        line_total = product.box_price_paise * qty
        order.items.append(
            models.OrderItem(
                product_id=product.id,
                product_name=product.name,
                mrp_paise=product.mrp_paise,
                box_price_paise=product.box_price_paise,
                qty_boxes=qty,
                line_total_paise=line_total,
            )
        )
        total_boxes += qty
        total_value += line_total

    order.total_products = len(merged)
    order.total_boxes = total_boxes
    order.total_value_paise = total_value
    db.add(order)
    db.flush()
    return order, True


def replace_order_items(
    db: Session, order: models.Order, items: list[schemas.OrderItemIn]
) -> models.Order:
    """Admin edit path. Re-prices from the current catalogue, which is what an
    edit means: the order is being re-booked, not historically re-read."""
    merged: dict[int, int] = {}
    for item in items:
        merged[item.product_id] = merged.get(item.product_id, 0) + item.qty_boxes

    products = {
        p.id: p
        for p in db.scalars(
            select(models.Product).where(models.Product.id.in_(merged.keys()))
        )
    }
    missing = sorted(set(merged) - set(products))
    if missing:
        raise OrderRejected(f"unknown product_id(s): {missing}")

    order.items.clear()
    db.flush()

    total_boxes = 0
    total_value = 0
    for product_id, qty in merged.items():
        product = products[product_id]
        line_total = product.box_price_paise * qty
        order.items.append(
            models.OrderItem(
                product_id=product.id,
                product_name=product.name,
                mrp_paise=product.mrp_paise,
                box_price_paise=product.box_price_paise,
                qty_boxes=qty,
                line_total_paise=line_total,
            )
        )
        total_boxes += qty
        total_value += line_total

    order.total_products = len(merged)
    order.total_boxes = total_boxes
    order.total_value_paise = total_value
    db.flush()
    return order


def to_out(order: models.Order) -> schemas.OrderOut:
    return schemas.OrderOut(
        id=order.id,
        client_uuid=order.client_uuid,
        customer_id=order.customer_id,
        customer_name=order.customer.name,
        customer_mobile=order.customer.mobile,
        salesman_name=order.salesman.name if order.salesman else None,
        order_date=order.order_date,
        booked_at=order.booked_at,
        total_products=order.total_products,
        total_boxes=order.total_boxes,
        total_value_paise=order.total_value_paise,
        items=[schemas.OrderItemOut.model_validate(i) for i in order.items],
    )
