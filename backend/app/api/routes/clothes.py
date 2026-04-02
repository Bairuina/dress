from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Response, status

from app.crud.clothes import (
    create_clothes as create_clothes_record,
    delete_clothes as delete_clothes_record,
    get_clothes_by_id,
    get_clothes_list,
    update_clothes as update_clothes_record,
)
from app.core.exceptions import not_found
from app.db.session import get_db
from app.schemas.clothes import ClothesCreate, ClothesItem, ClothesUpdate

router = APIRouter()


@router.get("", response_model=list[ClothesItem])
def list_clothes(db: Session = Depends(get_db)):
    return get_clothes_list(db)


@router.get("/{clothes_id}", response_model=ClothesItem)
def get_clothes(clothes_id: int, db: Session = Depends(get_db)):
    clothes = get_clothes_by_id(db, clothes_id)
    if clothes is None:
        raise not_found("Clothes item not found")
    return clothes


@router.post("", response_model=ClothesItem, status_code=status.HTTP_201_CREATED)
def create_clothes(payload: ClothesCreate, db: Session = Depends(get_db)):
    return create_clothes_record(db, payload)


@router.put("/{clothes_id}", response_model=ClothesItem)
def update_clothes(clothes_id: int, payload: ClothesUpdate, db: Session = Depends(get_db)):
    clothes = get_clothes_by_id(db, clothes_id)
    if clothes is None:
        raise not_found("Clothes item not found")
    return update_clothes_record(db, clothes, payload)


@router.delete("/{clothes_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_clothes(clothes_id: int, db: Session = Depends(get_db)) -> Response:
    clothes = get_clothes_by_id(db, clothes_id)
    if clothes is None:
        raise not_found("Clothes item not found")
    delete_clothes_record(db, clothes)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
