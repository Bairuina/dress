from fastapi import Header, HTTPException, status

from app.schemas.auth import UserProfile

DEMO_ACCESS_TOKEN = "dress-demo-token"
DEMO_USERNAME = "admin"
DEMO_PASSWORD = "dress123"

DEMO_USER = UserProfile(
    id=1,
    username="admin",
    display_name="Dress 管理员",
    role="admin",
    avatar_text="DR",
    bio="负责录入衣物、维护穿搭内容和管理分享内容。",
)


def verify_demo_credentials(username: str, password: str) -> bool:
    return username == DEMO_USERNAME and password == DEMO_PASSWORD


def get_current_user(authorization: str | None = Header(default=None)) -> UserProfile:
    expected_value = f"Bearer {DEMO_ACCESS_TOKEN}"
    if authorization != expected_value:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing access token",
        )
    return DEMO_USER
