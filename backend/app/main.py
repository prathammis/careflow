from __future__ import annotations

from typing import Any, Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Body
from datetime import datetime

from . import storage
from .telemetry import setup_opentelemetry
from .db import init_db
from pydantic import BaseModel
from .agents.openai_client import generate as openai_generate
from .redis_client import client as redis_client
import json
from .ml.model_zoo import xgboost_example, lightgbm_example, train_logistic_dummy

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
    if _tracer:
        with _tracer.start_as_current_span("patients.upload"):
            added = storage.add_patients(rows)
    else:
        added = storage.add_patients(rows)
    return {"added": added, "total": len(storage.get_patients())}


@app.get("/api/traces")
def get_traces() -> dict[str, list[dict[str, Any]]]:
    return {"items": storage.get_traces()}


@app.post("/api/traces")
def create_trace(run: Dict[str, Any] = Body(...)) -> dict[str, Any]:
    """Create a new trace run entry in the in-memory store and return its id."""
    if _tracer:
        with _tracer.start_as_current_span("trace.create"):
            traces = storage.get_traces()
            trace_id = run.get("id") or f"trace-{len(traces) + 1:04d}"
            run["id"] = trace_id
            run.setdefault("events", [])
            run["createdAt"] = datetime.utcnow().isoformat() + "Z"
            storage.append_trace(run)
    else:
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


@app.get("/api/ml/info")
def ml_info() -> dict[str, Any]:
    return {"xgboost": xgboost_example(), "lightgbm": lightgbm_example()}


@app.post("/api/ml/train/logistic")
def ml_train_logistic() -> dict[str, Any]:
    m = train_logistic_dummy()
    if isinstance(m, dict) and m.get("error"):
        return {"ok": False, "error": m.get("error")}
    # return a small summary
    return {"ok": True, "model_type": type(m).__name__}


class AgentRunRequest(BaseModel):
    prompt: str
    model: str | None = None


class CacheSet(BaseModel):
    key: str
    value: dict | list | str | int | float | None = None


@app.post("/api/cache/set")
def cache_set(req: CacheSet) -> dict[str, Any]:
    if redis_client:
        try:
            redis_client.set(req.key, json.dumps(req.value))
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "error": str(e)}
    return {"ok": False, "error": "redis not configured"}


@app.get("/api/cache/{key}")
def cache_get(key: str) -> dict[str, Any]:
    if redis_client:
        try:
            v = redis_client.get(key)
            if v is None:
                return {"key": key, "value": None}
            try:
                return {"key": key, "value": json.loads(v)}
            except Exception:
                return {"key": key, "value": v.decode()}
        except Exception as e:
            return {"key": key, "error": str(e)}
    return {"key": key, "error": "redis not configured"}


@app.post("/api/agents/run")
def run_agent(req: AgentRunRequest) -> dict[str, Any]:
    """Run a simple OpenAI prompt via the `openai_client` wrapper.

    If OpenAI is not configured or package missing, the wrapper returns
    an error dict which is forwarded to the caller.
    """
    if _tracer:
        with _tracer.start_as_current_span("agent.openai.call"):
            resp = openai_generate(req.prompt, model=req.model or "gpt-4o-mini")
    else:
        resp = openai_generate(req.prompt, model=req.model or "gpt-4o-mini")
    return {"ok": True, "result": resp}
