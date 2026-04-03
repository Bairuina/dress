# Dress Project

Front-end and back-end separated scaffold for an outfit styling and digital wardrobe product.

## Stack

- Frontend: React + TypeScript + Vite + Ant Design
- Backend: FastAPI + SQLAlchemy + MySQL
- Cache: Redis (reserved, not wired yet)

## Structure

```text
frontend/
backend/
docs/
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Default URL: `http://localhost:5173`

## Backend

Create and activate a Python virtual environment first, then:

```bash
cd backend
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --port 8000
```

Default URL: `http://localhost:8000`

API docs: `http://localhost:8000/docs`

## Notes

- Update `backend/.env` before connecting to a real MySQL database.
- The backend currently exposes `/health` and full CRUD for `/api/v1/clothes`.
- The backend creates the `clothes` table on startup if it does not exist yet.
- The frontend already includes API wiring, a wardrobe list, and a create form.
- Redis is now connected locally and used as a cache layer for the clothes list endpoint.
- You can verify Redis by opening `http://localhost:8000/health` and checking `redis_connected: true`.
- You can verify cache hits by calling `GET /api/v1/clothes` twice and checking the response header `X-Cache`:
  first request is usually `MISS`, next request is usually `HIT`.
- Frontend architecture notes: [frontend/README.md](frontend/README.md)
- Backend architecture notes: [backend/README.md](backend/README.md)
- Product design notes: [docs/product-design.md](docs/product-design.md)
