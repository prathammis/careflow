from __future__ import annotations

from typing import Any, Dict, List

# Simple in-memory store for demo purposes.
_patients: List[Dict[str, Any]] = []
_traces: List[Dict[str, Any]] = []


def add_patients(items: List[Dict[str, Any]]) -> int:
    """Add multiple patient records to the in-memory store.

    Returns the number of patients added.
    """
    start = len(_patients)
    _patients.extend(items)
    return len(_patients) - start


def get_patients() -> List[Dict[str, Any]]:
    return _patients


def append_patient(item: Dict[str, Any]) -> None:
    _patients.append(item)


def add_traces(items: List[Dict[str, Any]]) -> int:
    start = len(_traces)
    _traces.extend(items)
    return len(_traces) - start


def get_traces() -> List[Dict[str, Any]]:
    return _traces


def append_trace(item: Dict[str, Any]) -> None:
    _traces.append(item)
