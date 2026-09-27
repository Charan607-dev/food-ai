import joblib
import pandas as pd
from pathlib import Path


# --------------------------------------------------
# MODEL PATHS
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent.parent

RISK_MODEL_PATH = (
    BASE_DIR
    / "backend"
    / "models"
    / "spoilage_model.pkl"
)

SHELF_LIFE_MODEL_PATH = (
    BASE_DIR
    / "backend"
    / "models"
    / "shelf_life_model.pkl"
)


# --------------------------------------------------
# LOAD MODELS
# --------------------------------------------------

risk_model = joblib.load(
    RISK_MODEL_PATH
)

shelf_life_model = joblib.load(
    SHELF_LIFE_MODEL_PATH
)


# --------------------------------------------------
# PREDICTION FUNCTION
# --------------------------------------------------

def predict_spoilage(
    food_type,
    temperature_c,
    humidity_percent,
    days_since_packaging,
    packaging_material,
    storage_condition,
):

    input_data = pd.DataFrame(
        [
            {
                "food_type": food_type,
                "temperature_c": temperature_c,
                "humidity_percent": humidity_percent,
                "days_since_packaging": days_since_packaging,
                "packaging_material": packaging_material,
                "storage_condition": storage_condition,
            }
        ]
    )


    # --------------------------------------------------
    # RISK PREDICTION
    # --------------------------------------------------

    risk_prediction = risk_model.predict(
        input_data
    )[0]

    risk_probabilities = (
        risk_model.predict_proba(
            input_data
        )[0]
    )

    risk_classes = risk_model.classes_


    confidence = {
        class_name: round(
            float(probability),
            4,
        )
        for class_name, probability in zip(
            risk_classes,
            risk_probabilities,
        )
    }


    # --------------------------------------------------
    # SHELF-LIFE PREDICTION
    # --------------------------------------------------

    remaining_days = (
        shelf_life_model.predict(
            input_data
        )[0]
    )


    # Prevent negative shelf-life values
    remaining_days = max(
        0,
        round(
            float(remaining_days),
            1,
        ),
    )


    # --------------------------------------------------
    # RETURN RESULT
    # --------------------------------------------------

    return {
        "spoilage_risk": risk_prediction,

        "confidence": confidence,

        "remaining_shelf_life_days": remaining_days,
    }