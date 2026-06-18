"""Reproduce and serialize the Linear Regression model used in the source notebook."""

from __future__ import annotations

import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "Housing.csv"
ARTIFACT_DIR = ROOT / "artifacts"


def main() -> None:
    frame = pd.read_csv(DATA_PATH)
    encoded = pd.get_dummies(
        frame,
        columns=frame.select_dtypes(include="object").columns,
        drop_first=True,
        dtype=int,
    )
    features = encoded.drop(columns="price")
    target = encoded["price"]
    x_train, x_test, y_train, y_test = train_test_split(
        features,
        target,
        test_size=0.20,
        random_state=42,
    )
    model = LinearRegression().fit(x_train, y_train)
    predictions = model.predict(x_test)

    metrics = {
        "mae": float(mean_absolute_error(y_test, predictions)),
        "rmse": float(np.sqrt(mean_squared_error(y_test, predictions))),
        "r2": float(r2_score(y_test, predictions)),
        "random_forest_mae": 1021546.0353211008,
        "random_forest_rmse": 1400565.9728553821,
        "random_forest_r2": 0.611918531405699,
    }
    numeric_names = ["area", "bedrooms", "bathrooms", "stories", "parking"]
    category_thresholds = target.quantile([1 / 3, 2 / 3]).tolist()
    percentiles = target.quantile([0.10, 0.25, 0.50, 0.75, 0.90])
    metadata = {
        "model": "Linear Regression",
        "model_version": "housing-lr-1.0.0",
        "feature_names": features.columns.tolist(),
        "feature_means": {name: float(value) for name, value in features.mean().items()},
        "coefficients": {
            name: float(coefficient)
            for name, coefficient in zip(features.columns, model.coef_, strict=True)
        },
        "intercept": float(model.intercept_),
        "metrics": metrics,
        "dataset": {
            "name": "Kaggle Housing Prices Dataset",
            "records": int(len(frame)),
            "features": 12,
            "average_price": float(target.mean()),
            "price_min": float(target.min()),
            "price_max": float(target.max()),
        },
        "category_thresholds": [float(value) for value in category_thresholds],
        "numeric_ranges": {
            name: [float(frame[name].min()), float(frame[name].max())]
            for name in numeric_names
        },
        "price_distribution": {
            "min": float(target.min()),
            "q10": float(percentiles.loc[0.10]),
            "q25": float(percentiles.loc[0.25]),
            "median": float(percentiles.loc[0.50]),
            "q75": float(percentiles.loc[0.75]),
            "q90": float(percentiles.loc[0.90]),
            "max": float(target.max()),
        },
        "limitations": [
            "The model is trained on 545 historical records from one public dataset.",
            "It does not account for live market conditions, precise locality, property age, or transaction costs.",
            "The estimated range is derived from test RMSE and is not a formal appraisal or guaranteed sale price.",
            "Predictions outside observed feature ranges are extrapolations and should be treated cautiously.",
        ],
    }

    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, ARTIFACT_DIR / "house_price_model.joblib")
    (ARTIFACT_DIR / "model_metadata.json").write_text(
        json.dumps(metadata, indent=2),
        encoding="utf-8",
    )
    print(
        "Model serialized successfully: "
        f"MAE={metrics['mae']:.2f}, RMSE={metrics['rmse']:.2f}, R2={metrics['r2']:.6f}"
    )


if __name__ == "__main__":
    main()

