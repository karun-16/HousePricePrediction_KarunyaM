# 🏠 House Price Prediction & HouseVision AI

## 📌 Project Overview

This repository was originally developed as part of the **XYlofy AI Data Science Internship – Week 1** and later expanded into **HouseVision AI**, a modern full-stack property valuation platform.

The project demonstrates the complete machine learning workflow:

* Data exploration
* Data preprocessing
* Feature engineering
* Machine learning model development
* Model evaluation
* Business insights
* Data visualization
* Full-stack AI application development

The primary objective is to predict residential property prices using machine learning techniques by analyzing various housing characteristics such as:

* Property area
* Number of bedrooms
* Number of bathrooms
* Parking spaces
* Number of stories
* Furnishing status
* Air conditioning
* Basement
* Guest room
* Main road access
* Preferred area
* Other housing amenities

The project evolves from a Jupyter Notebook into a production-inspired AI application that allows users to estimate property prices through an interactive web interface.

---

# 🎯 Problem Statement

Accurate property valuation is one of the major challenges in the real estate industry.

Traditional pricing methods often rely on:

* Historical comparisons
* Manual estimations
* Local market knowledge
* Subjective assumptions

Machine learning provides a data-driven approach that can identify complex relationships between housing features and market value.

This project aims to:

* Analyze housing data.
* Understand important price-driving factors.
* Build predictive machine learning models.
* Compare multiple regression algorithms.
* Evaluate model performance.
* Generate business insights.
* Transform the predictive model into a practical web application.

---

# 📊 Dataset

## Dataset Source

Kaggle Housing Prices Dataset

## Dataset Information

* Total observations: 545
* Housing features: 13
* Target variable:

  * Price

## Features

* Area
* Bedrooms
* Bathrooms
* Stories
* Main Road
* Guest Room
* Basement
* Hot Water Heating
* Air Conditioning
* Parking
* Preferred Area
* Furnishing Status

---

# 🛠 Technologies Used

## Data Analysis

* Python
* Pandas
* NumPy

## Data Visualization

* Matplotlib
* Seaborn

## Machine Learning

* Scikit-learn
* Linear Regression
* Random Forest Regressor

## Full Stack Application

### Backend

* FastAPI
* Python
* Joblib

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

---

# ⚙ Data Preprocessing

Several preprocessing steps were performed to prepare the data for machine learning.

## Data Loading

* Loaded CSV dataset.
* Verified successful import.

## Data Cleaning

* Checked missing values.
* Checked duplicate records.
* Verified data consistency.

## Feature Engineering

* Converted categorical variables.
* Applied one-hot encoding.
* Prepared model-ready dataset.

## Data Validation

* Verified feature distributions.
* Examined correlations.
* Identified important predictors.

---

# 🤖 Machine Learning Models

Two regression models were developed and compared.

---

## 1. Linear Regression

Linear Regression was used as the baseline predictive model.

### Performance

MAE:
970,043

RMSE:
1,324,507

R² Score:
0.653

### Observation

Linear Regression produced the best overall performance and generalization capability for this dataset.

---

## 2. Random Forest Regressor

Random Forest was implemented to capture potential non-linear relationships.

### Performance

MAE:
1,021,546

RMSE:
1,400,566

R² Score:
0.612

### Observation

Although Random Forest performed reasonably well, Linear Regression achieved better predictive accuracy on this dataset.

---

# 📈 Data Visualizations

The project includes several visualizations for exploratory data analysis.

## 1. House Price Distribution

Histogram illustrating the distribution of property prices.

Purpose:

* Identify skewness.
* Detect common price ranges.

---

## 2. Correlation Heatmap

Shows relationships between housing variables.

Purpose:

* Understand feature interactions.
* Identify highly correlated variables.

---

## 3. Actual vs Predicted Prices

Scatter plot comparing model predictions with actual values.

Purpose:

* Evaluate prediction quality.
* Understand model behavior.

---

# 🔍 Key Findings

The analysis revealed several important insights.

## Pricing Trends

* House prices are positively skewed.
* Premium properties create a long price tail.

## Important Features

Strong positive relationships with price include:

* Area
* Bathrooms
* Number of stories
* Air conditioning
* Preferred location

## Model Performance

* Linear Regression outperformed Random Forest.
* The dataset shows largely linear relationships.

---

# 💼 Business Insights

The project generates practical business recommendations.

Real estate businesses should:

* Prioritize property area.
* Consider bathroom count.
* Include premium amenities.
* Account for preferred locations.
* Factor air conditioning into valuation.

These variables significantly influence estimated property values.

---

# 🚀 HouseVision AI

HouseVision AI extends the original machine learning project into a modern full-stack application.

It transforms the trained predictive model into an interactive property valuation experience.

Users can estimate property prices by adjusting housing characteristics through an intuitive interface.

---

## HouseVision AI Features

### Property Valuation

* Interactive prediction interface.
* Real-time property estimation.

### Machine Learning Integration

* Trained Linear Regression model.
* Fast prediction response.

### Backend

* FastAPI REST API.
* Model serialization.
* Prediction endpoints.

### Frontend

* Modern UI.
* Responsive design.
* Interactive controls.

### Analytics

* Market insights.
* Dataset statistics.
* Model performance.

### Transparency

* Model metrics.
* Prediction confidence range.
* Feature-based explanations.

---

# 📁 Repository Structure

```text
HousePricePrediction_KarunyaM/

│── analysis.ipynb
│── Housing.csv
│── summary.pdf
│── README.md
│
├── charts/
│   ├── histogram_house_prices.png
│   ├── correlation_heatmap.png
│   └── actual_vs_predicted.png
│
├── HouseVision-AI/
│   │
│   ├── backend/
│   │
│   ├── frontend/
│   │
│   ├── artifacts/
│   │
│   └── data/
```

---

# 🎯 Project Outcomes

This project successfully demonstrates:

✅ Data preprocessing

✅ Exploratory Data Analysis

✅ Feature Engineering

✅ Machine Learning

✅ Model Comparison

✅ Model Evaluation

✅ Data Visualization

✅ Business Insights

✅ API Development

✅ Full Stack Development

✅ Machine Learning Deployment Concepts

---

# 🚀 Future Improvements

Potential enhancements include:

* Hyperparameter tuning.
* Gradient Boosting models.
* XGBoost implementation.
* Additional feature engineering.
* Larger datasets.
* Live market data integration.
* Cloud deployment.
* Enhanced analytics dashboard.
* Advanced property recommendation features.

---

# 👨‍💻 Author

## M. Karunya Sarma

**XYlofy AI Data Science Internship – Week 1 Project**

This repository documents the complete journey from a machine learning notebook to a modern AI-powered property valuation platform through the development of HouseVision AI.

---

## ⭐ If you found this project interesting, consider giving this repository a star!
