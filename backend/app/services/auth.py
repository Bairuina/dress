from fastapi import HTTPException, status

from app.core.security import DEMO_ACCESS_TOKEN, DEMO_USER, verify_demo_credentials
from app.schemas.auth import LoginResponse


def login(username: str, password: str) -> LoginResponse:
    if not verify_demo_credentials(username, password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Username or password is incorrect",
        )

    return LoginResponse(access_token=DEMO_ACCESS_TOKEN, user=DEMO_USER)
