# 🏠 House Price Prediction

## 📌 Project Overview

This project was developed as part of the **XYlofy AI Data Science Internship – Week 1**.

The objective is to predict house prices using machine learning techniques by analyzing various housing features such as area, number of bedrooms, bathrooms, parking spaces, furnishing status, and other amenities.

Two regression models were implemented and compared:
- Linear Regression
- Random Forest Regressor

---

## 🎯 Problem Statement

House price estimation is an important challenge in the real estate industry. Buyers and sellers often rely on assumptions and historical comparisons.

This project aims to:
- Analyze housing data.
- Identify important price-driving features.
- Build predictive machine learning models.
- Compare model performance.
- Generate business insights.

---

## 📊 Dataset

Dataset Source:
Kaggle Housing Prices Dataset

Dataset Size:
- 545 observations
- 13 housing features
- Target variable: Price

---

## 🛠 Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- Matplotlib
- Seaborn
- Jupyter Notebook

---

## ⚙ Data Preprocessing

The following preprocessing steps were performed:

- Loaded the dataset.
- Checked for missing values.
- Checked for duplicate records.
- Converted categorical variables using one-hot encoding.
- Prepared the dataset for machine learning.

---

## 🤖 Machine Learning Models

### Linear Regression

Used as the baseline regression model.

Performance:

- MAE: 970,043
- RMSE: 1,324,507
- R² Score: 0.653

---

### Random Forest Regressor

Used to capture non-linear relationships.

Performance:

- MAE: 1,021,546
- RMSE: 1,400,566
- R² Score: 0.612

---

## 📈 Visualizations

The project includes three visualizations:

### 1. House Price Distribution

Histogram showing the distribution of prices.

### 2. Correlation Heatmap

Displays relationships between housing features.

### 3. Actual vs Predicted Prices

Scatter plot comparing model predictions with actual values.

---

## 🔍 Key Findings

- House prices show a positively skewed distribution.
- Area and bathrooms have strong positive relationships with price.
- Air conditioning and number of stories also contribute significantly.
- Linear Regression performed better than Random Forest for this dataset.

---

## 💼 Business Recommendation

Real estate businesses should prioritize property area, number of bathrooms, and important amenities when estimating property values.

---

## 📁 Project Structure

```
HousePricePrediction_KarunyaM/

│── analysis.ipynb
│── Housing.csv
│── HousePricePrediction_Summary.pdf
│── README.md
│
├── charts/
│   ├── histogram_house_prices.png
│   ├── correlation_heatmap.png
│   └── actual_vs_predicted.png
```

---

## 🚀 Future Improvements

- Hyperparameter tuning.
- Additional regression models.
- Feature importance analysis.
- Streamlit web application.
- Model deployment.

---

## 👨‍💻 Author

M. Karunya Sarma

XYlofy AI Data Science Internship

Week 1 Project
