from __future__ import annotations

from typing import Any, Dict, List
from pathlib import Path
import json

# Simple in-memory store with optional JSON persistence for demo purposes.
_DATA_DIR = Path(__file__).resolve().parent / "data"
_DATA_DIR.mkdir(parents=True, exist_ok=True)
_PATIENTS_FILE = _DATA_DIR / "patients.json"
_TRACES_FILE = _DATA_DIR / "traces.json"


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
    start = len(_patients)
    _patients.extend(items)
    _save_json(_PATIENTS_FILE, _patients)
    return len(_patients) - start


def get_patients() -> List[Dict[str, Any]]:
    return _patients


def append_patient(item: Dict[str, Any]) -> None:
    _patients.append(item)
    _save_json(_PATIENTS_FILE, _patients)


def add_traces(items: List[Dict[str, Any]]) -> int:
    start = len(_traces)
    _traces.extend(items)
    _save_json(_TRACES_FILE, _traces)
    return len(_traces) - start


def get_traces() -> List[Dict[str, Any]]:
    return _traces


def append_trace(item: Dict[str, Any]) -> None:
    _traces.append(item)
    _save_json(_TRACES_FILE, _traces)
