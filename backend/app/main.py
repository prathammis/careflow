from __future__ import annotations

from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CareFlow Nexus API", version="0.1.0")

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
    return {"items": PATIENTS}


@app.get("/api/workflows/trace")
def get_workflow_trace() -> dict[str, list[dict[str, Any]]]:
    return {"items": WORKFLOW_TRACE}


@app.get("/api/prompts")
def get_prompts() -> dict[str, list[dict[str, Any]]]:
    return {"items": PROMPTS}
