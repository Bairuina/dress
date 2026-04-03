# Backend Architecture

This backend is a small FastAPI application designed to be easy to explain in a full-stack interview.

## Layers

```text
app/
  api/       # HTTP layer: routes and request/response binding
  core/      # configuration and shared exceptions
  crud/      # database access only
  db/        # engine and session management
  models/    # SQLAlchemy models
  schemas/   # Pydantic request/response schemas
  services/  # business logic and orchestration
  main.py    # application entrypoint
```

## Responsibility Split

- `api/routes`
  Accepts HTTP requests, validates inputs through schemas, and returns responses.
- `services`
  Contains business rules and coordinates CRUD calls.
- `crud`
  Talks to the database directly.
- `models`
  Defines table structures.
- `schemas`
  Defines the data shape of requests and responses.

## Current Clothes Flow

- `GET /api/v1/clothes`
- `GET /api/v1/clothes/{clothes_id}`
- `POST /api/v1/clothes`
- `PUT /api/v1/clothes/{clothes_id}`
- `DELETE /api/v1/clothes/{clothes_id}`

## Reading Order

1. `app/main.py`
2. `app/api/routes/clothes.py`
3. `app/services/clothes.py`
4. `app/crud/clothes.py`
5. `app/models/clothes.py`
6. `app/schemas/clothes.py`

## Notes

- Keep the current product scope unchanged.
- The goal of this refactor is explainability, separation of concerns, and easier testing.
- Redis is now wired into the project as an optional cache layer.
- `GET /api/v1/clothes` uses Redis list caching when Redis is available.
- Create/update/delete on clothes will invalidate the clothes list cache.
- `GET /health` also shows whether Redis is currently reachable.
- `GET /api/v1/clothes` now returns an `X-Cache` response header:
  `MISS` means data came from MySQL and was written into Redis.
  `HIT` means data was returned directly from Redis.

## How To Verify Redis

1. Start the backend.
2. Open `http://localhost:8000/health` and confirm `redis_connected` is `true`.
3. Call `GET /api/v1/clothes` in Swagger or the browser network panel.
4. Check the `X-Cache` header:
   first request should usually be `MISS`
   second request should usually be `HIT`
