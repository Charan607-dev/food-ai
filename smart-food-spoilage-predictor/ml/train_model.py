import pandas as pd
import joblib

from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline

from sklearn.ensemble import (
    RandomForestClassifier,
    RandomForestRegressor,
)

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    mean_absolute_error,
    mean_squared_error,
)

import numpy as np


# --------------------------------------------------
# PATHS
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = (
    BASE_DIR
    / "data"
    / "raw"
    / "food_spoilage_dataset.csv"
)

MODEL_DIR = BASE_DIR / "backend" / "models"

RISK_MODEL_PATH = (
    MODEL_DIR / "spoilage_model.pkl"
)

SHELF_LIFE_MODEL_PATH = (
    MODEL_DIR / "shelf_life_model.pkl"
)


# --------------------------------------------------
# LOAD DATASET
# --------------------------------------------------

print("Loading dataset...")

df = pd.read_csv(DATA_PATH)

print(f"Dataset loaded: {df.shape[0]} rows")


# --------------------------------------------------
# FEATURES
# --------------------------------------------------

features = [
    "food_type",
    "temperature_c",
    "humidity_percent",
    "days_since_packaging",
    "packaging_material",
    "storage_condition",
]


categorical_features = [
    "food_type",
    "packaging_material",
    "storage_condition",
]


numeric_features = [
    "temperature_c",
    "humidity_percent",
    "days_since_packaging",
]


X = df[features]


# --------------------------------------------------
# PREPROCESSOR
# --------------------------------------------------

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
            categorical_features,
        ),
        (
            "numeric",
            "passthrough",
            numeric_features,
        ),
    ]
)


# ==================================================
# MODEL 1 — SPOILAGE RISK CLASSIFICATION
# ==================================================

print("\nTraining spoilage risk model...")


y_risk = df["spoilage_risk"]


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_risk,
    test_size=0.20,
    random_state=42,
    stratify=y_risk,
)


risk_model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced",
)


risk_pipeline = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor,
        ),
        (
            "model",
            risk_model,
        ),
    ]
)


risk_pipeline.fit(
    X_train,
    y_train,
)


risk_predictions = risk_pipeline.predict(
    X_test
)


risk_accuracy = accuracy_score(
    y_test,
    risk_predictions,
)


print("\nRisk Model Complete!")

print(
    f"Accuracy: {risk_accuracy:.4f}"
)

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        risk_predictions,
    )
)


# ==================================================
# MODEL 2 — REMAINING SHELF LIFE REGRESSION
# ==================================================

print("\nTraining remaining shelf-life model...")


y_shelf_life = df[
    "remaining_shelf_life_days"
]


X_train_reg, X_test_reg, y_train_reg, y_test_reg = (
    train_test_split(
        X,
        y_shelf_life,
        test_size=0.20,
        random_state=42,
    )
)


shelf_life_model = RandomForestRegressor(
    n_estimators=200,
    random_state=42,
)


shelf_life_pipeline = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor,
        ),
        (
            "model",
            shelf_life_model,
        ),
    ]
)


shelf_life_pipeline.fit(
    X_train_reg,
    y_train_reg,
)


shelf_life_predictions = (
    shelf_life_pipeline.predict(
        X_test_reg
    )
)


mae = mean_absolute_error(
    y_test_reg,
    shelf_life_predictions,
)


rmse = np.sqrt(
    mean_squared_error(
        y_test_reg,
        shelf_life_predictions,
    )
)


print("\nShelf-Life Model Complete!")

print(
    f"Mean Absolute Error: {mae:.4f} days"
)

print(
    f"Root Mean Squared Error: {rmse:.4f} days"
)


# --------------------------------------------------
# SAVE MODELS
# --------------------------------------------------

MODEL_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


joblib.dump(
    risk_pipeline,
    RISK_MODEL_PATH,
)


joblib.dump(
    shelf_life_pipeline,
    SHELF_LIFE_MODEL_PATH,
)


print("\nModels saved successfully!")

print(
    f"Risk model: {RISK_MODEL_PATH}"
)

print(
    f"Shelf-life model: {SHELF_LIFE_MODEL_PATH}"
)