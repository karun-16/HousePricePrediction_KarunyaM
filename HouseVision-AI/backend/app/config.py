from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]


@dataclass(frozen=True)
class Settings:
    app_name: str = "HouseVision AI API"
    app_version: str = "1.0.0"
    model_path: Path = BASE_DIR / "artifacts" / "house_price_model.joblib"
    metadata_path: Path = BASE_DIR / "artifacts" / "model_metadata.json"

    @property
    def cors_origins(self) -> list[str]:
        raw_origins = os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000",
        )
        return [origin.strip() for origin in raw_origins.split(",") if origin.strip()]


settings = Settings()

