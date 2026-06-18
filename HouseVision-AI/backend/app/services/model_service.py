from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import joblib
import numpy as np
import pandas as pd

from app.schemas import PredictionResponse, PropertyInput
from app.services.insight_engine import FEATURE_LABELS, build_summary, describe_driver


class ModelService:
    def __init__(self, model_path: Path, metadata_path: Path) -> None:
        if not model_path.exists() or not metadata_path.exists():
            raise RuntimeError(
                "Model artifacts are missing. Run `python scripts/train_model.py` first."
            )
        self.model = joblib.load(model_path)
        self.metadata: dict[str, Any] = json.loads(metadata_path.read_text("utf-8"))
        self.features: list[str] = self.metadata["feature_names"]

    def _vectorize(self, payload: PropertyInput) -> pd.DataFrame:
        values = {
            "area": payload.area,
            "bedrooms": payload.bedrooms,
            "bathrooms": payload.bathrooms,
            "stories": payload.stories,
            "parking": payload.parking,
            "mainroad_yes": int(payload.mainroad == "yes"),
            "guestroom_yes": int(payload.guestroom == "yes"),
            "basement_yes": int(payload.basement == "yes"),
            "hotwaterheating_yes": int(payload.hotwaterheating == "yes"),
            "airconditioning_yes": int(payload.airconditioning == "yes"),
            "prefarea_yes": int(payload.prefarea == "yes"),
            "furnishingstatus_semi-furnished": int(
                payload.furnishingstatus == "semi-furnished"
            ),
            "furnishingstatus_unfurnished": int(
                payload.furnishingstatus == "unfurnished"
            ),
        }
        return pd.DataFrame(
            [[float(values[name]) for name in self.features]],
            columns=self.features,
        )

    def _category(self, price: float) -> str:
        lower, upper = self.metadata["category_thresholds"]
        if price <= lower:
            return "Budget"
        if price <= upper:
            return "Mid Range"
        return "Premium"

    def _confidence(self, payload: PropertyInput) -> dict[str, Any]:
        ranges = self.metadata["numeric_ranges"]
        checks = {
            "area": payload.area,
            "bedrooms": payload.bedrooms,
            "bathrooms": payload.bathrooms,
            "stories": payload.stories,
            "parking": payload.parking,
        }
        out_of_range = [
            key
            for key, value in checks.items()
            if value < ranges[key][0] or value > ranges[key][1]
        ]
        base_score = round(self.metadata["metrics"]["r2"] * 100 + 20)
        score = max(55, min(92, base_score - (8 * len(out_of_range))))
        label = "High" if score >= 85 else "Strong" if score >= 72 else "Moderate"
        if out_of_range:
            explanation = (
                "Some inputs fall outside the training data range, so this is an "
                "extrapolated estimate."
            )
        else:
            explanation = (
                "Inputs are within the training data range; confidence reflects "
                "the model's measured test performance."
            )
        return {"score": score, "label": label, "explanation": explanation}

    def _property_score(self, price: float) -> int:
        distribution = self.metadata["price_distribution"]
        anchors = [
            distribution["min"],
            distribution["q10"],
            distribution["q25"],
            distribution["median"],
            distribution["q75"],
            distribution["q90"],
            distribution["max"],
        ]
        percentiles = [2, 10, 25, 50, 75, 90, 98]
        return int(round(np.interp(price, anchors, percentiles)))

    def _drivers(self, vector: pd.DataFrame) -> list[dict[str, Any]]:
        means = np.array([self.metadata["feature_means"][name] for name in self.features])
        contributions = (vector.iloc[0].to_numpy() - means) * np.asarray(self.model.coef_)
        ranked = np.argsort(np.abs(contributions))[::-1]
        drivers: list[dict[str, Any]] = []
        for index in ranked:
            contribution = float(contributions[index])
            if abs(contribution) < 25_000:
                continue
            feature = self.features[index]
            impact = "positive" if contribution > 0 else "negative"
            label = FEATURE_LABELS.get(feature, feature.replace("_", " ").title())
            drivers.append(
                {
                    "feature": feature,
                    "label": label,
                    "impact": impact,
                    "contribution": round(contribution, 2),
                    "explanation": describe_driver(feature, impact),
                }
            )
            if len(drivers) == 4:
                break
        return drivers

    def predict(self, payload: PropertyInput) -> PredictionResponse:
        vector = self._vectorize(payload)
        predicted_price = max(0.0, float(self.model.predict(vector)[0]))
        average = float(self.metadata["dataset"]["average_price"])
        difference_amount = predicted_price - average
        difference_percent = (difference_amount / average) * 100
        category = self._category(predicted_price)
        drivers = self._drivers(vector)
        rmse = float(self.metadata["metrics"]["rmse"])
        margin = 1.28 * rmse

        return PredictionResponse(
            predicted_price=round(predicted_price, 2),
            formatted_price=f"₹{predicted_price:,.0f}",
            category=category,
            dataset_average=average,
            difference_amount=round(difference_amount, 2),
            difference_percent=round(difference_percent, 2),
            property_score=self._property_score(predicted_price),
            confidence=self._confidence(payload),
            estimated_range=[
                round(max(0, predicted_price - margin), 2),
                round(predicted_price + margin, 2),
            ],
            major_value_drivers=drivers,
            summary=build_summary(category, difference_percent, drivers),
            model_version=self.metadata["model_version"],
        )

    def public_metadata(self) -> dict[str, Any]:
        return {
            "model": self.metadata["model"],
            "model_version": self.metadata["model_version"],
            "metrics": self.metadata["metrics"],
            "dataset": self.metadata["dataset"],
            "category_thresholds": self.metadata["category_thresholds"],
            "numeric_ranges": self.metadata["numeric_ranges"],
            "limitations": self.metadata["limitations"],
        }
