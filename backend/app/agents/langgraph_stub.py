"""Very small LangGraph stub used for local scaffolding.

LangGraph (or similar orchestrators) can be integrated later. For now this
module provides a placeholder `run_workflow` used by demo agents.
"""
from typing import Any, Dict


def run_workflow(workflow_spec: Dict[str, Any], inputs: Dict[str, Any]) -> Dict[str, Any]:
    # simple deterministic stub: echo inputs with a status
    return {"status": "ok", "workflow": workflow_spec.get("name", "mock"), "inputs": inputs}
