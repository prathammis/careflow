# CareFlow Nexus Backend

FastAPI stub for the CareFlow Nexus MVP.

## Run locally

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `GET /health`
- `GET /api/overview`
- `GET /api/patients`
- `GET /api/workflows/trace`
- `GET /api/prompts`
