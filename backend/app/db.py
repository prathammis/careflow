"""Database scaffold using SQLModel (simple init/create_all helper).

Set `DATABASE_URL` in env to switch to Postgres (e.g. postgres+psycopg://...).
Defaults to a local sqlite file for convenience.
"""
from __future__ import annotations

import os
from sqlmodel import SQLModel, create_engine

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev.db")
engine = create_engine(DATABASE_URL, echo=False)


def init_db() -> None:
    """Create all SQLModel tables (no-op if none declared)."""
    SQLModel.metadata.create_all(engine)
