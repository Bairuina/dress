from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.clothes import ClothesBatchCreate, ClothesCreate, ClothesItem, ClothesUpdate
from app.services.clothes import (
    create_clothes as create_clothes_service,
    create_clothes_batch as create_clothes_batch_service,
    delete_clothes as delete_clothes_service,
    get_clothes as get_clothes_service,
    list_clothes as list_clothes_service,
    update_clothes as update_clothes_service,
)

router = APIRouter()


@router.get("", response_model=list[ClothesItem])
def list_clothes(response: Response, db: Session = Depends(get_db)):
    clothes_list, cache_hit = list_clothes_service(db)
    response.headers["X-Cache"] = "HIT" if cache_hit else "MISS"
    return clothes_list


@router.get("/{clothes_id}", response_model=ClothesItem)
def get_clothes(clothes_id: int, db: Session = Depends(get_db)):
    return get_clothes_service(db, clothes_id)


@router.post("/batch", response_model=list[ClothesItem], status_code=status.HTTP_201_CREATED)
def create_clothes_batch(payload: ClothesBatchCreate, db: Session = Depends(get_db)):
    return create_clothes_batch_service(db, payload.items)


@router.post("", response_model=ClothesItem, status_code=status.HTTP_201_CREATED)
def create_clothes(payload: ClothesCreate, db: Session = Depends(get_db)):
    return create_clothes_service(db, payload)


@router.put("/{clothes_id}", response_model=ClothesItem)
def update_clothes(clothes_id: int, payload: ClothesUpdate, db: Session = Depends(get_db)):
    return update_clothes_service(db, clothes_id, payload)


@router.delete("/{clothes_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_clothes(clothes_id: int, db: Session = Depends(get_db)) -> Response:
    delete_clothes_service(db, clothes_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
