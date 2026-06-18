from typing import Literal

from pydantic import BaseModel, Field, field_validator


YesNo = Literal["yes", "no"]
FurnishingStatus = Literal["furnished", "semi-furnished", "unfurnished"]


class PropertyInput(BaseModel):
    area: int = Field(ge=1000, le=20000, description="Floor area in square feet")
    bedrooms: int = Field(ge=1, le=10)
    bathrooms: int = Field(ge=1, le=6)
    stories: int = Field(ge=1, le=6)
    parking: int = Field(ge=0, le=5)
    mainroad: YesNo
    guestroom: YesNo
    basement: YesNo
    hotwaterheating: YesNo
    airconditioning: YesNo
    prefarea: YesNo
    furnishingstatus: FurnishingStatus

    @field_validator(
        "mainroad",
        "guestroom",
        "basement",
        "hotwaterheating",
        "airconditioning",
        "prefarea",
        mode="before",
    )
    @classmethod
    def normalize_yes_no(cls, value: object) -> object:
        if isinstance(value, bool):
            return "yes" if value else "no"
        if isinstance(value, str):
            return value.lower().strip()
        return value


class ValueDriver(BaseModel):
    feature: str
    label: str
    impact: Literal["positive", "negative", "neutral"]
    contribution: float
    explanation: str


class Confidence(BaseModel):
    score: int
    label: Literal["Moderate", "Strong", "High"]
    explanation: str


class PredictionResponse(BaseModel):
    predicted_price: float
    formatted_price: str
    category: Literal["Budget", "Mid Range", "Premium"]
    dataset_average: float
    difference_amount: float
    difference_percent: float
    property_score: int
    confidence: Confidence
    estimated_range: list[float]
    major_value_drivers: list[ValueDriver]
    summary: str
    currency: str = "INR"
    model_version: str


class HealthResponse(BaseModel):
    status: Literal["healthy"]
    model_loaded: bool
    version: str

