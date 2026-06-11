from __future__ import annotations

from typing import Any, Dict, List
from pathlib import Path
import json
import os

# Simple in-memory store with optional JSON persistence for demo purposes.
_DATA_DIR = Path(__file__).resolve().parent / "data"
_DATA_DIR.mkdir(parents=True, exist_ok=True)
_PATIENTS_FILE = _DATA_DIR / "patients.json"
_TRACES_FILE = _DATA_DIR / "traces.json"


# Try to enable SQLModel-backed storage when available. If SQLModel or DB
# connection is not configured, fall back to JSON-file persistence (existing
# behavior).
_USE_DB = False
try:
    from sqlmodel import Field, Session, SQLModel, select
    from .db import engine

    class Patient(SQLModel, table=True):
        id: str | None = Field(default=None, primary_key=True)
        name: str | None = None
        riskScore: int | None = None
        openGaps: int | None = None
        recommendation: str | None = None

    class Trace(SQLModel, table=True):
        id: str | None = Field(default=None, primary_key=True)
        agent: str | None = None
        status: str | None = None
        runtimeMs: int | None = None
        costUsd: float | None = None
        events: str | None = None
        createdAt: str | None = None

    _USE_DB = True
except Exception:
    _USE_DB = False


def _load_json(path: Path) -> List[Dict[str, Any]]:
    if not path.exists():
        return []
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return []


def _save_json(path: Path, data: List[Dict[str, Any]]) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


# in-memory caches (loaded from disk at import)
_patients: List[Dict[str, Any]] = _load_json(_PATIENTS_FILE)
_traces: List[Dict[str, Any]] = _load_json(_TRACES_FILE)


def add_patients(items: List[Dict[str, Any]]) -> int:
    """Add multiple patient records to the in-memory store and persist to disk.

    Returns the number of patients added.
    """
    if _USE_DB:
        added = 0
        with Session(engine) as session:
            objs = []
            for it in items:
                obj = Patient(
                    id=it.get("id"),
                    name=it.get("name"),
                    riskScore=it.get("riskScore"),
                    openGaps=it.get("openGaps"),
                    recommendation=it.get("recommendation"),
                )
                objs.append(obj)
            session.add_all(objs)
            session.commit()
            added = len(objs)
        return added

    start = len(_patients)
    _patients.extend(items)
    _save_json(_PATIENTS_FILE, _patients)
    return len(_patients) - start


def get_patients() -> List[Dict[str, Any]]:
    if _USE_DB:
        with Session(engine) as session:
            results = session.exec(select(Patient)).all()
            return [r.dict() for r in results]
    return _patients


def append_patient(item: Dict[str, Any]) -> None:
    if _USE_DB:
        with Session(engine) as session:
            obj = Patient(
                id=item.get("id"),
                name=item.get("name"),
                riskScore=item.get("riskScore"),
                openGaps=item.get("openGaps"),
                recommendation=item.get("recommendation"),
            )
            session.add(obj)
            session.commit()
        return

    _patients.append(item)
    _save_json(_PATIENTS_FILE, _patients)


def add_traces(items: List[Dict[str, Any]]) -> int:
    if _USE_DB:
        objs = []
        with Session(engine) as session:
            for it in items:
                obj = Trace(
                    id=it.get("id"),
                    agent=it.get("agent"),
                    status=it.get("status"),
                    runtimeMs=it.get("runtimeMs"),
                    costUsd=it.get("costUsd"),
                    events=json.dumps(it.get("events", [])),
                    createdAt=it.get("createdAt"),
                )
                objs.append(obj)
            session.add_all(objs)
            session.commit()
        return len(objs)

    start = len(_traces)
    _traces.extend(items)
    _save_json(_TRACES_FILE, _traces)
    return len(_traces) - start


def get_traces() -> List[Dict[str, Any]]:
    if _USE_DB:
        with Session(engine) as session:
            results = session.exec(select(Trace)).all()
            out: List[Dict[str, Any]] = []
            for r in results:
                d = r.dict()
                try:
                    d["events"] = json.loads(d.get("events") or "[]")
                except Exception:
                    d["events"] = []
                out.append(d)
            return out
    return _traces


def append_trace(item: Dict[str, Any]) -> None:
    if _USE_DB:
        with Session(engine) as session:
            obj = Trace(
                id=item.get("id"),
                agent=item.get("agent"),
                status=item.get("status"),
                runtimeMs=item.get("runtimeMs"),
                costUsd=item.get("costUsd"),
                events=json.dumps(item.get("events", [])),
                createdAt=item.get("createdAt"),
            )
            session.add(obj)
            session.commit()
        return

    _traces.append(item)
    _save_json(_TRACES_FILE, _traces)
