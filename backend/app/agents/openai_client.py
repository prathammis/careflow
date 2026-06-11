from __future__ import annotations

import os
from typing import Any, Dict

try:
    import openai
except Exception:  # pragma: no cover - best-effort import
    openai = None

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if openai and OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY


def generate(prompt: str, model: str = "gpt-4o-mini") -> Dict[str, Any]:
    """Call OpenAI ChatCompletion (simple wrapper). Returns raw response.

    This is a minimal integration for demo purposes — the project reads
    `OPENAI_API_KEY` from the env when present.
    """
    if not openai:
        return {"error": "openai package not installed"}

    resp = openai.ChatCompletion.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300,
    )
    return resp
