from __future__ import annotations

from typing import Any


FEATURE_LABELS = {
    "area": "Generous floor area",
    "bedrooms": "Bedroom capacity",
    "bathrooms": "Bathroom count",
    "stories": "Multi-storey layout",
    "parking": "Dedicated parking",
    "mainroad_yes": "Main-road access",
    "guestroom_yes": "Guest room",
    "basement_yes": "Basement space",
    "hotwaterheating_yes": "Hot-water heating",
    "airconditioning_yes": "Air conditioning",
    "prefarea_yes": "Preferred-area location",
    "furnishingstatus_semi-furnished": "Semi-furnished condition",
    "furnishingstatus_unfurnished": "Unfurnished condition",
}


def describe_driver(feature: str, impact: str) -> str:
    label = FEATURE_LABELS.get(feature, feature.replace("_", " ").title())
    if impact == "positive":
        return f"{label} lifts the estimate relative to a typical property."
    if impact == "negative":
        return f"{label} places downward pressure on the estimate."
    return f"{label} has a limited effect on this estimate."


def build_summary(
    category: str,
    difference_percent: float,
    drivers: list[dict[str, Any]],
) -> str:
    segment_text = {
        "Budget": "the accessible residential segment",
        "Mid Range": "the mid-market residential segment",
        "Premium": "the premium residential segment",
    }[category]
    direction = "above" if difference_percent >= 0 else "below"
    strongest = [driver["label"].lower() for driver in drivers[:2]]
    driver_text = (
        f" Its valuation is most influenced by {strongest[0]}"
        + (f" and {strongest[1]}" if len(strongest) > 1 else "")
        + "."
        if strongest
        else ""
    )
    return (
        f"This property sits in {segment_text}, approximately "
        f"{abs(difference_percent):.1f}% {direction} the dataset average."
        f"{driver_text}"
    )

