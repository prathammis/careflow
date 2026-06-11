"""Minimal Redis client wrapper for caching / pubsub demos."""
from __future__ import annotations

import os

try:
    import redis
except Exception:
    redis = None

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
if redis:
    client = redis.from_url(REDIS_URL)
else:
    client = None
