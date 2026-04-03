from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.clothes import Clothes
from app.schemas.clothes import ClothesCreate, ClothesUpdate


def get_clothes_list(db: Session) -> list[Clothes]:
    statement = select(Clothes).order_by(Clothes.id.desc())
    return db.scalars(statement).all()


def get_clothes_by_id(db: Session, clothes_id: int) -> Clothes | None:
    statement = select(Clothes).where(Clothes.id == clothes_id)
    return db.scalar(statement)


def create_clothes(db: Session, payload: ClothesCreate) -> Clothes:
    clothes = Clothes(**payload.model_dump())
    db.add(clothes)
    db.commit()
    db.refresh(clothes)
    return clothes


def create_clothes_batch(db: Session, payloads: list[ClothesCreate]) -> list[Clothes]:
    clothes_items = [Clothes(**payload.model_dump()) for payload in payloads]
    db.add_all(clothes_items)
    db.commit()
    for clothes in clothes_items:
        db.refresh(clothes)
    return clothes_items


def update_clothes(db: Session, clothes: Clothes, payload: ClothesUpdate) -> Clothes:
    update_data = payload.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(clothes, field, value)

    db.add(clothes)
    db.commit()
    db.refresh(clothes)
    return clothes


def delete_clothes(db: Session, clothes: Clothes) -> None:
    db.delete(clothes)
    db.commit()
