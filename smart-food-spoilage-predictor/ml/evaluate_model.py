import pandas as pd
import joblib

from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report,
)


# --------------------------------------------------
# Paths
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = BASE_DIR / "data" / "raw" / "food_spoilage_dataset.csv"

MODEL_PATH = BASE_DIR / "backend" / "models" / "spoilage_model.pkl"


# --------------------------------------------------
# Load data and model
# --------------------------------------------------

print("Loading dataset...")

df = pd.read_csv(DATA_PATH)

print("Loading trained model...")

model = joblib.load(MODEL_PATH)


# --------------------------------------------------
# Features and target
# --------------------------------------------------

features = [
    "food_type",
    "temperature_c",
    "humidity_percent",
    "days_since_packaging",
    "packaging_material",
    "storage_condition",
]

target = "spoilage_risk"


X = df[features]
y = df[target]


# --------------------------------------------------
# Same test split used during training
# --------------------------------------------------

_, X_test, _, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y,
)


# --------------------------------------------------
# Predictions
# --------------------------------------------------

print("Running evaluation...")

predictions = model.predict(X_test)


# --------------------------------------------------
# Metrics
# --------------------------------------------------

accuracy = accuracy_score(
    y_test,
    predictions,
)

precision = precision_score(
    y_test,
    predictions,
    average="weighted",
    zero_division=0,
)

recall = recall_score(
    y_test,
    predictions,
    average="weighted",
    zero_division=0,
)

f1 = f1_score(
    y_test,
    predictions,
    average="weighted",
    zero_division=0,
)


# --------------------------------------------------
# Display results
# --------------------------------------------------

print("\n===================================")
print("MODEL EVALUATION RESULTS")
print("===================================")

print(f"Accuracy :  {accuracy:.4f}")
print(f"Precision:  {precision:.4f}")
print(f"Recall   :  {recall:.4f}")
print(f"F1 Score :  {f1:.4f}")


print("\nClassification Report:")
print(
    classification_report(
        y_test,
        predictions,
        zero_division=0,
    )
)


# --------------------------------------------------
# Confusion Matrix
# --------------------------------------------------

labels = ["Safe", "Warning", "High Risk"]

matrix = confusion_matrix(
    y_test,
    predictions,
    labels=labels,
)

print("\nConfusion Matrix:")
print("                 Predicted")
print("              Safe  Warning  High Risk")

for label, row in zip(labels, matrix):
    print(
        f"{label:<12} {row[0]:>4} {row[1]:>8} {row[2]:>10}"
    )

print("\nEvaluation completed successfully.")