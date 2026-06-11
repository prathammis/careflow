"""Minimal ML utility stubs for scikit-learn / xgboost / lightgbm prototypes.

These functions are intentionally tiny — they demonstrate how the libraries
can be used and are safe to call locally. They don't attempt to ship a full
training pipeline.
"""
from __future__ import annotations

from typing import Any


def train_logistic_dummy() -> Any:
    try:
        from sklearn.linear_model import LogisticRegression
        import numpy as np
    except Exception:
        return {"error": "scikit-learn or numpy not installed"}

    X = np.random.randn(200, 4)
    y = (X[:, 0] + X[:, 1] > 0).astype(int)
    m = LogisticRegression().fit(X, y)
    return m


def predict_with_model(model: Any, X) -> Any:
    try:
        return model.predict(X)
    except Exception:
        return {"error": "prediction failed"}


def xgboost_example():
    try:
        import xgboost as xgb
    except Exception:
        return {"error": "xgboost not installed"}
    # minimal demo: return library version
    return {"xgboost_version": xgb.__version__}


def lightgbm_example():
    try:
        import lightgbm as lgb
    except Exception:
        return {"error": "lightgbm not installed"}
    return {"lightgbm_version": lgb.__version__}
