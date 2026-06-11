# CareFlow Nexus (prototype)

CareFlow Nexus is a prototype multi-agent healthcare intelligence demo. It demonstrates CSV ingestion, a mock agent-run workflow, and an observability/trace store for inspecting agent executions.

This repo contains a Next.js frontend (App Router + Tailwind) and a small FastAPI backend used for demo persistence and APIs.

Tech stack
- Frontend: Next.js (App Router), React, TypeScript, TailwindCSS
- Backend: FastAPI, Uvicorn (development)
- Persistence (prototype): JSON files in `backend/app/data/` (traces.json, patients.json)

Quickstart (local)
1. Install dependencies for the frontend and backend:

```bash
# frontend
npm install

# backend (in project root)
pip install -r backend/requirements.txt
```

2. Start the backend API (port 8000):

```bash
python -m uvicorn backend.app.main:app --reload --port 8000
```

3. Start the frontend dev server (port 3000):

```bash
npm run dev
```

Open the app at http://localhost:3000

Key features (prototype)
- CSV Upload Studio: parse and ingest patient records (client preview + POST to `/api/upload`).
- Trace Store: list and inspect mock agent runs created by the `Run Agent` button.
- Run Agent mock UI: triggers a synthetic agent execution and persists a trace to `backend/app/data/traces.json`.

Important files
- `src/app/` — Next.js App Router pages and components (frontend UI)
- `src/lib/mock-data.ts` — mock datasets used during development
- `src/components/run-agent-button.tsx` — client button to create mock traces
- `src/app/traces/page.tsx` — traces listing (now fetches `/api/traces`)
- `backend/app/main.py` — FastAPI application and API routes
- `backend/app/storage.py` — demo persistence layer (reads/writes JSON under `backend/app/data/`)

Notes & next steps
- This is a prototype. JSON-file persistence is suitable for local testing only — migrate to Postgres or another DB for real workloads.
- To make agent runs richer, add structured `events` and expand the trace detail page to render timelines and tool calls.
- If you'd like, I can scaffold SQL persistence with `sqlmodel` + migrations, or wire additional pages to the backend APIs.

Troubleshooting
- If `uvicorn` is not found, install dependencies and run using `python -m uvicorn ...` as shown above.
- Backend data is stored in `backend/app/data/`; remove that folder to reset persisted demo data.

Added scaffolding
-----------------
I added lightweight scaffolds for several integrations under `backend/app/` to make it easy to enable them at a basic level:

- `backend/app/db.py`: SQLModel-based DB scaffold (`init_db()` creates tables). Set `DATABASE_URL` to use Postgres.
- `backend/app/redis_client.py`: Redis client wrapper (reads `REDIS_URL`).
- `backend/app/telemetry.py`: OpenTelemetry setup (OTLP exporter).
- `backend/app/agents/openai_client.py`: Minimal OpenAI wrapper (reads `OPENAI_API_KEY`).
- `backend/app/agents/langgraph_stub.py`: Local stub for orchestration workflows.
- `backend/app/ml/model_zoo.py`: Tiny sklearn/xgboost/lightgbm demo helpers.

These are starter scaffolds and include safe fallbacks when packages are not installed. To enable them fully, install the updated backend requirements and set environment variables as needed:

```bash
pip install -r backend/requirements.txt
```

**Technology Used**
- **Frontend:** Next.js (App Router), React, TypeScript, TailwindCSS
- **Backend:** FastAPI, Uvicorn
- **Machine Learning:** scikit-learn, XGBoost, LightGBM (demo stubs in `backend/app/ml`)
- **AI / LLMs:** OpenAI (`backend/app/agents/openai_client.py`) — requires `OPENAI_API_KEY`
- **Orchestration:** LangGraph (stubbed as `backend/app/agents/langgraph_stub.py`)
- **Database:** SQLModel (Postgres-ready via `DATABASE_URL`), sqlite fallback (`backend/app/dev.db`)
- **Cache / Queue:** Redis client scaffold (`backend/app/redis_client.py`) — `REDIS_URL`
- **Observability:** OpenTelemetry scaffold (`backend/app/telemetry.py`) with OTLP exporter
- **Tracing / Observability UI:** In-app trace store (prototype) at `src/app/traces` backed by `backend/app/storage.py`

**Environment variables**
- `OPENAI_API_KEY` — OpenAI API key for agent demos
- `DATABASE_URL` — SQLModel database URL (e.g. `postgres+psycopg://user:pass@host:5432/db`); defaults to `sqlite:///./dev.db`
- `REDIS_URL` — Redis connection string (defaults to `redis://localhost:6379/0`)
- OTLP exporter env vars — configure OTLP endpoint if using tracing collector

**Enabling integrations (quick)**
- Install backend deps:
	```bash
	pip install -r backend/requirements.txt
	```
- Start backend (creates DB tables if `sqlmodel` available):
	```bash
	python -m uvicorn backend.app.main:app --reload --port 8000
	```
- To enable OpenAI flows: set `OPENAI_API_KEY` and POST to `/api/agents/run` or use the UI once wired.
- To use Postgres: set `DATABASE_URL` and restart backend (tables created by `init_db()` at startup).
- To enable Redis caching: set `REDIS_URL` and call `/api/cache/set` and `/api/cache/{key}`.
- To collect traces: run an OTLP collector and configure environment variables for the exporter; basic spans are created by the backend when `telemetry` initializes.

If you want, I can add migration scripts (Alembic) and example UI controls for these integrations — tell me which to prioritize.

