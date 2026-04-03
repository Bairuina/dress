import json
from collections.abc import Callable
from typing import TypeVar

import redis

from app.core.config import settings

T = TypeVar("T")


class RedisCache:
    def __init__(self) -> None:
        self._client = redis.Redis.from_url(
            settings.redis_url,
            decode_responses=True,
            socket_connect_timeout=1,
            socket_timeout=1,
        )

    def ping(self) -> bool:
        try:
            return bool(self._client.ping())
        except redis.RedisError:
            return False

    def get_json(self, key: str) -> object | None:
        try:
            value = self._client.get(key)
        except redis.RedisError:
            return None

        if value is None:
            return None

        return json.loads(value)

    def set_json(self, key: str, value: object, ttl_seconds: int) -> None:
        try:
            self._client.set(key, json.dumps(value, ensure_ascii=False), ex=ttl_seconds)
        except redis.RedisError:
            return

    def delete(self, *keys: str) -> None:
        if not keys:
            return

        try:
            self._client.delete(*keys)
        except redis.RedisError:
            return

    def get_or_set_json(self, key: str, ttl_seconds: int, producer: Callable[[], T]) -> T:
        cached_value = self.get_json(key)
        if cached_value is not None:
            return cached_value  # type: ignore[return-value]

        fresh_value = producer()
        self.set_json(key, fresh_value, ttl_seconds)
        return fresh_value


redis_cache = RedisCache()
