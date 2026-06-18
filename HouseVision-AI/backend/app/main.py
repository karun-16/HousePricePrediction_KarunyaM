from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.schemas import HealthResponse, PredictionResponse, PropertyInput
from app.services.model_service import ModelService


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model_service = ModelService(settings.model_path, settings.metadata_path)
    yield


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Production API for the HouseVision AI residential valuation experience.",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
)


@app.exception_handler(RuntimeError)
async def runtime_error_handler(_: Request, exc: RuntimeError) -> JSONResponse:
    return JSONResponse(status_code=503, content={"detail": str(exc)})


@app.get("/", tags=["System"])
async def root() -> dict[str, str]:
    return {
        "name": settings.app_name,
        "status": "operational",
        "documentation": "/docs",
    }


@app.get("/health", response_model=HealthResponse, tags=["System"])
async def health(request: Request) -> HealthResponse:
    return HealthResponse(
        status="healthy",
        model_loaded=hasattr(request.app.state, "model_service"),
        version=settings.app_version,
    )


@app.get("/api/v1/model", tags=["Model"])
async def model_metadata(request: Request) -> dict:
    return request.app.state.model_service.public_metadata()


@app.post("/api/v1/predict", response_model=PredictionResponse, tags=["Valuation"])
async def predict(payload: PropertyInput, request: Request) -> PredictionResponse:
    return request.app.state.model_service.predict(payload)

