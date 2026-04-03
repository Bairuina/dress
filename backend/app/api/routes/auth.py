from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.schemas.auth import LoginRequest, LoginResponse, UserProfile
from app.services.auth import login as login_service

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest) -> LoginResponse:
    return login_service(payload.username, payload.password)


@router.get("/me", response_model=UserProfile)
def get_me(current_user: UserProfile = Depends(get_current_user)) -> UserProfile:
    return current_user
