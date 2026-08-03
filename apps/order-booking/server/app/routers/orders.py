from __future__ import annotations

from datetime import date, datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..services import orders as order_service
from ..services.clock import today_local

router = APIRouter(prefix="/api/v1/orders", tags=["orders"])


class OrderEdit(BaseModel):
    customer_name: str | None = None
    items: list[schemas.OrderItemIn] = Field(min_length=1)


@router.post("", response_model=schemas.OrderOut)
def create_order(payload: schemas.OrderIn, db: Session = Depends(get_db)):
    try:
        order, _created = order_service.create_order(db, payload)
    except order_service.OrderRejected as exc:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, exc.detail) from exc
    db.commit()
    db.refresh(order)
    return order_service.to_out(order)


@router.get("", response_model=list[schemas.OrderOut])
def list_orders(
    db: Session = Depends(get_db),
    on: date | None = Query(default=None, description="Defaults to today (local time)."),
    from_date: date | None = None,
    to_date: date | None = None,
    salesman_code: str | None = None,
    q: str | None = Query(default=None, description="Match customer name or mobile."),
    limit: int = Query(default=200, le=1000),
):
    start = from_date or on or today_local()
    end = to_date or on or today_local()
    stmt = (
        select(models.Order)
        .join(models.Customer, models.Customer.id == models.Order.customer_id)
        .where(
            models.Order.is_deleted.is_(False),
            models.Order.order_date >= start,
            models.Order.order_date <= end,
        )
    )
    if salesman_code:
        stmt = stmt.join(models.Salesman).where(models.Salesman.code == salesman_code)
    if q:
        needle = f"%{q.strip().lower()}%"
        stmt = stmt.where(
            models.Customer.mobile.like(needle)
            | models.Customer.name.ilike(needle)
        )
    stmt = stmt.order_by(models.Order.booked_at.desc()).limit(limit)
    return [order_service.to_out(o) for o in db.scalars(stmt).unique()]


@router.get("/{order_id}", response_model=schemas.OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.get(models.Order, order_id)
    if order is None or order.is_deleted:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "order not found")
    return order_service.to_out(order)


@router.patch("/{order_id}", response_model=schemas.OrderOut)
def edit_order(order_id: int, payload: OrderEdit, db: Session = Depends(get_db)):
    order = db.get(models.Order, order_id)
    if order is None or order.is_deleted:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "order not found")
    if payload.customer_name:
        order.customer.name = payload.customer_name.strip()
    try:
        order_service.replace_order_items(db, order, payload.items)
    except order_service.OrderRejected as exc:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, exc.detail) from exc
    db.commit()
    db.refresh(order)
    return order_service.to_out(order)


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    """Soft delete. A load sheet that silently loses rows is worse than one
    that shows a cancelled order, and the row is still needed for audit."""
    order = db.get(models.Order, order_id)
    if order is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "order not found")
    order.is_deleted = True
    db.commit()


@router.post("/sync", response_model=schemas.SyncResponse)
def sync_orders(payload: list[schemas.OrderIn], db: Session = Depends(get_db)):
    """Batch push from a device coming back online.

    Each order is committed on its own: one bad row (a product the device
    knows and the server doesn't) must not block the other 40 orders in the
    salesman's pending queue.
    """
    results: list[schemas.SyncResult] = []
    for item in payload:
        try:
            order, created = order_service.create_order(db, item)
            db.commit()
            results.append(
                schemas.SyncResult(
                    client_uuid=item.client_uuid,
                    status="created" if created else "duplicate",
                    order_id=order.id,
                )
            )
        except order_service.OrderRejected as exc:
            db.rollback()
            results.append(
                schemas.SyncResult(
                    client_uuid=item.client_uuid, status="rejected", detail=exc.detail
                )
            )
        except Exception as exc:  # noqa: BLE001 - report, never drop the batch
            db.rollback()
            results.append(
                schemas.SyncResult(
                    client_uuid=item.client_uuid, status="rejected", detail=str(exc)
                )
            )
    return schemas.SyncResponse(results=results, server_time=datetime.now(timezone.utc))
