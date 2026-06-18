from fastapi.testclient import TestClient

from app.main import app


SAMPLE_PROPERTY = {
    "area": 8000,
    "bedrooms": 4,
    "bathrooms": 3,
    "stories": 2,
    "parking": 2,
    "mainroad": "yes",
    "guestroom": "yes",
    "basement": "yes",
    "hotwaterheating": "no",
    "airconditioning": "yes",
    "prefarea": "yes",
    "furnishingstatus": "furnished",
}


def test_health_and_model_loaded() -> None:
    with TestClient(app) as client:
        response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["model_loaded"] is True


def test_prediction_matches_source_notebook() -> None:
    with TestClient(app) as client:
        response = client.post("/api/v1/predict", json=SAMPLE_PROPERTY)
    assert response.status_code == 200
    body = response.json()
    assert abs(body["predicted_price"] - 9_413_967.44) < 1.0
    assert body["category"] == "Premium"
    assert len(body["major_value_drivers"]) >= 2
    assert body["currency"] == "INR"


def test_invalid_property_is_rejected() -> None:
    payload = SAMPLE_PROPERTY | {"area": 100, "bathrooms": 0}
    with TestClient(app) as client:
        response = client.post("/api/v1/predict", json=payload)
    assert response.status_code == 422

