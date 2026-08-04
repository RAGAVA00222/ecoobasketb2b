from __future__ import annotations

from datetime import date

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from .. import models, schemas


def _live_orders(from_date: date, to_date: date):
    return (
        (models.Order.is_deleted.is_(False))
        & (models.Order.order_date >= from_date)
        & (models.Order.order_date <= to_date)
    )


def summary(db: Session, from_date: date, to_date: date) -> schemas.ReportSummary:
    where = _live_orders(from_date, to_date)

    totals = db.execute(
        select(
            func.count(models.Order.id),
            func.count(func.distinct(models.Order.customer_id)),
            func.coalesce(func.sum(models.Order.total_boxes), 0),
            func.coalesce(func.sum(models.Order.total_value_paise), 0),
        ).where(where)
    ).one()

    product_rows = db.execute(
        select(
            models.OrderItem.product_id,
            func.min(models.OrderItem.product_name),
            func.sum(models.OrderItem.qty_boxes),
            func.sum(models.OrderItem.line_total_paise),
            func.coalesce(func.min(models.Product.brand), ""),
        )
        .join(models.Order, models.Order.id == models.OrderItem.order_id)
        # Outer join: a product deleted outright must not drop its boxes from
        # the sheet — the warehouse still has to ship them.
        .outerjoin(models.Product, models.Product.id == models.OrderItem.product_id)
        .where(where)
        .group_by(models.OrderItem.product_id)
        .order_by(func.sum(models.OrderItem.qty_boxes).desc())
    ).all()

    customer_rows = db.execute(
        select(
            models.Order.customer_id,
            models.Customer.name,
            models.Customer.mobile,
            func.count(models.Order.id),
            func.sum(models.Order.total_boxes),
            func.sum(models.Order.total_value_paise),
        )
        .join(models.Customer, models.Customer.id == models.Order.customer_id)
        .where(where)
        .group_by(models.Order.customer_id, models.Customer.name, models.Customer.mobile)
        .order_by(func.sum(models.Order.total_value_paise).desc())
    ).all()

    salesman_rows = db.execute(
        select(
            models.Salesman.code,
            models.Salesman.name,
            func.count(models.Order.id),
            func.sum(models.Order.total_boxes),
            func.sum(models.Order.total_value_paise),
        )
        .join(models.Salesman, models.Salesman.id == models.Order.salesman_id)
        .where(where)
        .group_by(models.Salesman.code, models.Salesman.name)
        .order_by(func.sum(models.Order.total_value_paise).desc())
    ).all()

    return schemas.ReportSummary(
        from_date=from_date,
        to_date=to_date,
        total_orders=totals[0],
        total_customers=totals[1],
        total_boxes=int(totals[2]),
        total_value_paise=int(totals[3]),
        product_wise=[
            schemas.ProductLine(
                product_id=r[0],
                product_name=r[1],
                total_boxes=int(r[2]),
                total_value_paise=int(r[3]),
                brand=r[4] or "",
            )
            for r in product_rows
        ],
        customer_wise=[
            schemas.CustomerLine(
                customer_id=r[0],
                customer_name=r[1],
                mobile=r[2],
                orders=r[3],
                total_boxes=int(r[4]),
                total_value_paise=int(r[5]),
            )
            for r in customer_rows
        ],
        salesman_wise=[
            schemas.SalesmanLine(
                salesman_code=r[0],
                salesman_name=r[1],
                orders=r[2],
                total_boxes=int(r[3]),
                total_value_paise=int(r[4]),
            )
            for r in salesman_rows
        ],
    )


def load_sheet(db: Session, from_date: date, to_date: date) -> schemas.LoadSheet:
    """Product-wise box totals — the one number the warehouse actually needs."""
    rows = db.execute(
        select(
            models.OrderItem.product_id,
            func.min(models.OrderItem.product_name),
            func.sum(models.OrderItem.qty_boxes),
            func.sum(models.OrderItem.line_total_paise),
            func.coalesce(func.min(models.Product.brand), ""),
        )
        .join(models.Order, models.Order.id == models.OrderItem.order_id)
        .outerjoin(models.Product, models.Product.id == models.OrderItem.product_id)
        .where(_live_orders(from_date, to_date))
        .group_by(models.OrderItem.product_id)
        # Sorted by brand within box count so the sheet reads as one block per
        # supplier when it is printed.
        .order_by(
            func.sum(models.OrderItem.qty_boxes).desc(),
            func.min(models.Product.brand),
        )
    ).all()

    lines = [
        schemas.ProductLine(
            product_id=r[0],
            product_name=r[1],
            total_boxes=int(r[2]),
            total_value_paise=int(r[3]),
            brand=r[4] or "",
        )
        for r in rows
    ]
    return schemas.LoadSheet(
        from_date=from_date,
        to_date=to_date,
        total_boxes=sum(line.total_boxes for line in lines),
        lines=lines,
    )
