# HouseVision AI

**AI-Powered Residential Intelligence Platform**

HouseVision AI is a production-minded portfolio application that turns a housing-price model into a polished, explainable property valuation experience. It predicts a residential selling price, positions the result in the observed market, surfaces major value drivers, and presents the original analysis as a responsive analytics dashboard.

## What is included

- Premium responsive interface with Home, Predict, Analytics, Model, and About pages
- Twelve-signal valuation form with sliders, toggles, and furnishing status
- FastAPI prediction service with Pydantic input validation
- Serialized scikit-learn Linear Regression artifact
- Estimated value band, market segment, average comparison, property score, and value drivers
- Original project visualizations and model comparison evidence
- Vercel and Render deployment configuration
- Backend regression and contract tests

The scope intentionally excludes authentication, databases, payments, maps, listings, chatbots, and admin systems.

## Repository structure

```text
HouseVision-AI/
├── backend/
│   ├── app/                 # API, schemas, configuration, model service
│   ├── artifacts/           # Serialized model and generated metadata
│   ├── data/Housing.csv     # Source dataset
│   ├── scripts/             # Reproducible one-model training script
│   └── tests/               # API behavior and notebook parity tests
├── frontend/
│   ├── app/                 # Next.js routes
│   ├── components/          # Shared product components
│   ├── lib/                 # API contract and site data
│   └── public/analytics/    # Original notebook visualizations
├── docs/implementation-plan.md
└── render.yaml
```

## Model evidence

The model reproduces the original notebook pipeline: one-hot categorical encoding, an 80/20 train/test split with `random_state=42`, and a single Linear Regression estimator.

| Metric | Linear Regression | Random Forest comparison |
|---|---:|---:|
| MAE | ₹970,043 | ₹1,021,546 |
| RMSE | ₹1,324,507 | ₹1,400,566 |
| R² | 0.653 | 0.612 |

Linear Regression is the deployed model because it produced lower held-out error and a higher R². Random Forest is retained only as historical comparison evidence and is not trained or served by this application.

## Run locally

### 1. Backend

Python 3.11 is recommended.

```powershell
cd D:\HouseVision-AI\backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python scripts\train_model.py
uvicorn app.main:app --reload --port 8000
```

API documentation is available at `http://localhost:8000/docs`.

### 2. Frontend

```powershell
cd D:\HouseVision-AI\frontend
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Test and build

```powershell
cd D:\HouseVision-AI\backend
.\.venv\Scripts\python.exe -m pytest -q

cd D:\HouseVision-AI\frontend
npm run check
npm run build
```

## API contract

- `GET /health` — service and artifact status
- `GET /api/v1/model` — public model metrics, dataset facts, ranges, and limitations
- `POST /api/v1/predict` — validated valuation and derived insights

Set `NEXT_PUBLIC_API_URL` on Vercel to the deployed Render service URL. Set `CORS_ORIGINS` on Render to the final Vercel domain (comma-separated if more than one origin is needed).

## Responsible use

Predictions are based on 545 historical records from a public dataset. They do not include live market conditions, exact locality, property age, construction quality, or transaction costs. Results are exploratory and are not a professional appraisal, investment recommendation, or guaranteed selling price.

