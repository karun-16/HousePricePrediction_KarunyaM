import {
  BarChart3,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  Lightbulb,
  ScanSearch,
} from "lucide-react";

export const GITHUB_URL = "https://github.com/karun-16/HousePricePrediction_KarunyaM";

export const features = [
  {
    icon: BrainCircuit,
    title: "Machine Learning",
    description: "A validated Linear Regression model converts twelve property signals into a clear market estimate.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Market Analytics",
    description: "Explore pricing patterns, correlations, market segments, and model performance in one focused view.",
  },
  {
    icon: ScanSearch,
    title: "Residential Intelligence",
    description: "Understand where a home sits in the market—not just what the algorithm predicts.",
  },
  {
    icon: Lightbulb,
    title: "Business Insights",
    description: "See value drivers, average comparisons, reliability context, and an interpretable property score.",
  },
];

export const analyticsCards = [
  {
    image: "/analytics/histogram_house_prices.png",
    eyebrow: "Market shape",
    title: "Price Distribution",
    description: "Prices are positively skewed: most homes cluster in the accessible and mid-market ranges, while a smaller premium tail stretches upward.",
    icon: BarChart3,
  },
  {
    image: "/analytics/correlation_heatmap.png",
    eyebrow: "Feature relationships",
    title: "Correlation Heatmap",
    description: "Area, bathrooms, stories, parking, and air conditioning show meaningful positive relationships with selling price.",
    icon: Building2,
  },
  {
    image: "/analytics/random_forest_feature_importance.png",
    eyebrow: "Model interpretation",
    title: "Feature Importance",
    description: "The comparison model reinforces the business story: area dominates, followed by bathrooms, air conditioning, parking, and stories.",
    icon: BrainCircuit,
  },
  {
    image: "/analytics/housing_market_segmentation.png",
    eyebrow: "Portfolio view",
    title: "Market Segmentation",
    description: "Quantile-based segments create balanced Budget, Mid Range, and Premium groups for practical market positioning.",
    icon: ChartNoAxesCombined,
  },
  {
    image: "/analytics/model_performance_comparison.png",
    eyebrow: "Model selection",
    title: "Model Comparison",
    description: "Linear Regression generalized better on the held-out test set than Random Forest, with lower error and higher R².",
    icon: ScanSearch,
  },
  {
    image: "/analytics/top5_expensive_houses.png",
    eyebrow: "Upper market",
    title: "Premium Housing Analysis",
    description: "The five highest-priced properties average ₹12.29M, illustrating the feature mix found at the top of this dataset.",
    icon: Lightbulb,
  },
];

export const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

