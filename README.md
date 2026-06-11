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
- This is a demo prototype. JSON-file persistence is suitable for local testing only — migrate to Postgres or another DB for real workloads.
- To make agent runs richer, add structured `events` and expand the trace detail page to render timelines and tool calls.
- If you'd like, I can scaffold SQL persistence with `sqlmodel` + migrations, or wire additional pages to the backend APIs.

Troubleshooting
- If `uvicorn` is not found, install dependencies and run using `python -m uvicorn ...` as shown above.
- Backend data is stored in `backend/app/data/`; remove that folder to reset persisted demo data.

License
- Prototype code for internal development. Add a license file if you plan to publish.

Happy hacking — tell me which next step you'd like me to take.
