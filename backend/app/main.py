from __future__ import annotations

from typing import Any, Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Body
from datetime import datetime

from . import storage
from .telemetry import setup_opentelemetry
from .db import init_db

app = FastAPI(title="CareFlow Nexus API", version="0.1.0")

# initialize observability and DB for local dev (best-effort)
try:
    _tracer = setup_opentelemetry()
except Exception:
    _tracer = None

try:
    init_db()
except Exception:
    pass

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OVERVIEW: dict[str, Any] = {
    "totalPatients": 18420,
    "highRiskPatients": 1284,
    "openCareGaps": 3902,
    "activeWorkflows": 42,
    "agentHealth": 98.9,
}

PATIENTS: list[dict[str, Any]] = [
    {
        "id": "104",
        "name": "Maria Thompson",
        "riskScore": 92,
        "openGaps": 4,
        "recommendation": "Schedule outreach within 24h",
    },
    {
        "id": "228",
        "name": "Andre Johnson",
        "riskScore": 86,
        "openGaps": 2,
        "recommendation": "Care manager review",
    },
    {
        "id": "417",
        "name": "Priya Patel",
        "riskScore": 78,
        "openGaps": 3,
        "recommendation": "Close preventive screening gaps",
    },
]

# initialize storage with demo patients
storage.add_patients(PATIENTS)

WORKFLOW_TRACE = [
    {
        "agent": "Data Extraction Agent",
        "runtimeMs": 214,
        "costUsd": 0.009,
        "status": "success",
    },
    {
        "agent": "Risk Prediction Agent",
        "runtimeMs": 286,
        "costUsd": 0.018,
        "status": "success",
    },
    {
        "agent": "Care Gap Agent",
        "runtimeMs": 174,
        "costUsd": 0.011,
        "status": "success",
    },
    {
        "agent": "Recommendation Agent",
        "runtimeMs": 192,
        "costUsd": 0.014,
        "status": "success",
    },
    {
        "agent": "AI Copilot Agent",
        "runtimeMs": 412,
        "costUsd": 0.027,
        "status": "success",
    },
]

PROMPTS = [
    {
        "id": "prompt-a",
        "name": "Prompt A",
        "description": "Evidence-first explanations with concise formatting.",
        "latencyMs": 328,
        "costUsd": 0.021,
    },
    {
        "id": "prompt-b",
        "name": "Prompt B",
        "description": "Clinician-friendly explanations with more workflow context.",
        "latencyMs": 412,
        "costUsd": 0.029,
    },
]


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/overview")
def get_overview() -> dict[str, Any]:
    return OVERVIEW


@app.get("/api/patients")
def get_patients() -> dict[str, list[dict[str, Any]]]:
    return {"items": storage.get_patients()}


@app.post("/api/upload")
def upload_patients(rows: List[Dict[str, Any]] = Body(...)) -> dict[str, Any]:
    """Accept parsed CSV rows (JSON array of objects) and add them to the in-memory store."""
    added = storage.add_patients(rows)
    return {"added": added, "total": len(storage.get_patients())}


@app.get("/api/traces")
def get_traces() -> dict[str, list[dict[str, Any]]]:
    return {"items": storage.get_traces()}


@app.post("/api/traces")
def create_trace(run: Dict[str, Any] = Body(...)) -> dict[str, Any]:
    """Create a new trace run entry in the in-memory store and return its id."""
    traces = storage.get_traces()
    trace_id = run.get("id") or f"trace-{len(traces) + 1:04d}"
    run["id"] = trace_id
    run.setdefault("events", [])
    run["createdAt"] = datetime.utcnow().isoformat() + "Z"
    storage.append_trace(run)
    return {"id": trace_id, "total": len(storage.get_traces())}


@app.get("/api/workflows/trace")
def get_workflow_trace() -> dict[str, list[dict[str, Any]]]:
    return {"items": WORKFLOW_TRACE}


@app.get("/api/prompts")
def get_prompts() -> dict[str, list[dict[str, Any]]]:
    return {"items": PROMPTS}
