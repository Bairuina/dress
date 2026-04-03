from fastapi import APIRouter

from app.api.routes.auth import router as auth_router
from app.api.routes.clothes import router as clothes_router

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(clothes_router, prefix="/clothes", tags=["clothes"])
