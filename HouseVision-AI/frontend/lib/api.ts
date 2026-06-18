import type { PredictionResponse, PropertyInput } from "@/lib/types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

export async function analyzeProperty(
  property: PropertyInput,
): Promise<PredictionResponse> {
  const response = await fetch(`${API_URL}/api/v1/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(property),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail?.[0]?.msg ?? body?.detail ?? "Valuation service is unavailable.");
  }
  return response.json() as Promise<PredictionResponse>;
}

