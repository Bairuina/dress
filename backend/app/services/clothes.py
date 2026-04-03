from sqlalchemy.orm import Session

from app.core.exceptions import not_found
from app.crud.clothes import (
    create_clothes as create_clothes_record,
    create_clothes_batch as create_clothes_batch_record,
    delete_clothes as delete_clothes_record,
    get_clothes_by_id,
    get_clothes_list,
    update_clothes as update_clothes_record,
)
from app.db.redis import redis_cache
from app.models.clothes import Clothes
from app.schemas.clothes import ClothesCreate, ClothesItem, ClothesUpdate

CLOTHES_LIST_CACHE_KEY = "clothes:list"
CLOTHES_LIST_CACHE_TTL_SECONDS = 60


def _serialize_clothes_list(clothes_list: list[Clothes]) -> list[dict]:
    return [ClothesItem.model_validate(item).model_dump(mode="json") for item in clothes_list]


def _invalidate_clothes_cache() -> None:
    redis_cache.delete(CLOTHES_LIST_CACHE_KEY)


def list_clothes(db: Session) -> tuple[list[dict] | list[Clothes], bool]:
    cached_data = redis_cache.get_json(CLOTHES_LIST_CACHE_KEY)
    if cached_data is not None:
        return cached_data, True

    fresh_data = _serialize_clothes_list(get_clothes_list(db))
    redis_cache.set_json(CLOTHES_LIST_CACHE_KEY, fresh_data, CLOTHES_LIST_CACHE_TTL_SECONDS)
    return fresh_data, False


def get_clothes(db: Session, clothes_id: int) -> Clothes:
    clothes = get_clothes_by_id(db, clothes_id)
    if clothes is None:
        raise not_found("Clothes item not found")
    return clothes


def create_clothes(db: Session, payload: ClothesCreate) -> Clothes:
    clothes = create_clothes_record(db, payload)
    _invalidate_clothes_cache()
    return clothes


def create_clothes_batch(db: Session, payloads: list[ClothesCreate]) -> list[Clothes]:
    clothes_list = create_clothes_batch_record(db, payloads)
    _invalidate_clothes_cache()
    return clothes_list


def update_clothes(db: Session, clothes_id: int, payload: ClothesUpdate) -> Clothes:
    clothes = get_clothes_by_id(db, clothes_id)
    if clothes is None:
        raise not_found("Clothes item not found")
    updated_clothes = update_clothes_record(db, clothes, payload)
    _invalidate_clothes_cache()
    return updated_clothes


def delete_clothes(db: Session, clothes_id: int) -> None:
    clothes = get_clothes_by_id(db, clothes_id)
    if clothes is None:
        raise not_found("Clothes item not found")
    delete_clothes_record(db, clothes)
    _invalidate_clothes_cache()
