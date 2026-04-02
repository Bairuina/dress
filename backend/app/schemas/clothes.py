from pydantic import BaseModel


class ClothesBase(BaseModel):
    name: str
    category: str
    color: str
    season: str


class ClothesCreate(ClothesBase):
    pass


class ClothesUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    color: str | None = None
    season: str | None = None


class ClothesItem(ClothesBase):
    id: int

    class Config:
        from_attributes = True
