# HouseVision AI — Implementation Plan

## Product boundary

HouseVision AI is a focused residential valuation product. It includes a public valuation workflow, model-backed insights, analytics, methodology, and project context. Authentication, databases, listings, maps, payments, chatbots, and admin tools remain deliberately out of scope.

## Architecture

1. **Model artifact** — reproduce the source notebook's exact one-hot encoding, 80/20 split, random state, and Linear Regression estimator; serialize the fitted model and public metadata.
2. **Valuation API** — validate twelve property inputs, perform inference, and derive category, dataset comparison, reliability context, property score, value drivers, and a concise deterministic summary.
3. **Product frontend** — use the Next.js App Router for Home, Predict, Analytics, Model, and About routes with shared navigation and responsive page structure.
4. **Analytics integration** — publish the original notebook charts with short business explanations rather than recomputing visualizations in the browser.
5. **Deployment** — deploy the frontend on Vercel and the stateless FastAPI service on Render, with the API URL and CORS allowlist supplied through environment variables.

## Verification gates

- Model output matches the known notebook sample prediction.
- API rejects invalid property ranges and reports a loaded artifact.
- TypeScript completes without errors.
- Next.js production compilation succeeds.
- Core pages and the prediction workflow are checked at desktop and mobile widths.

## Future extension seams

The service layer can add property comparison, investment scoring, renovation impact, or rental estimates later. These features are not implemented now; the typed API boundary and isolated insight service keep those additions possible without coupling them to the current interface.

