export type YesNo = "yes" | "no";
export type FurnishingStatus = "furnished" | "semi-furnished" | "unfurnished";

export interface PropertyInput {
  area: number;
  bedrooms: number;
  bathrooms: number;
  stories: number;
  parking: number;
  mainroad: YesNo;
  guestroom: YesNo;
  basement: YesNo;
  hotwaterheating: YesNo;
  airconditioning: YesNo;
  prefarea: YesNo;
  furnishingstatus: FurnishingStatus;
}

export interface ValueDriver {
  feature: string;
  label: string;
  impact: "positive" | "negative" | "neutral";
  contribution: number;
  explanation: string;
}

export interface PredictionResponse {
  predicted_price: number;
  formatted_price: string;
  category: "Budget" | "Mid Range" | "Premium";
  dataset_average: number;
  difference_amount: number;
  difference_percent: number;
  property_score: number;
  confidence: {
    score: number;
    label: "Moderate" | "Strong" | "High";
    explanation: string;
  };
  estimated_range: [number, number];
  major_value_drivers: ValueDriver[];
  summary: string;
  currency: "INR";
  model_version: string;
}

