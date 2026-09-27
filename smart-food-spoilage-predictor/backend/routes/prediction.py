from flask import Blueprint, request, jsonify

from services.prediction_service import predict_spoilage
from services.recommendation_service import get_recommendations
from services.explanation_service import explain_prediction


prediction_bp = Blueprint(
    "prediction",
    __name__,
)


@prediction_bp.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        required_fields = [
            "food_type",
            "temperature_c",
            "humidity_percent",
            "days_since_packaging",
            "packaging_material",
            "storage_condition",
        ]

        missing_fields = [
            field
            for field in required_fields
            if field not in data
        ]

        if missing_fields:
            return jsonify(
                {
                    "success": False,
                    "error": "Missing required fields",
                    "fields": missing_fields,
                }
            ), 400

        food_type = data["food_type"]

        temperature_c = float(
            data["temperature_c"]
        )

        humidity_percent = float(
            data["humidity_percent"]
        )

        days_since_packaging = int(
            data["days_since_packaging"]
        )

        packaging_material = data[
            "packaging_material"
        ]

        storage_condition = data[
            "storage_condition"
        ]

        # --------------------------------------------------
        # AI PREDICTION
        # --------------------------------------------------

        prediction_result = predict_spoilage(
            food_type=food_type,
            temperature_c=temperature_c,
            humidity_percent=humidity_percent,
            days_since_packaging=days_since_packaging,
            packaging_material=packaging_material,
            storage_condition=storage_condition,
        )

        spoilage_risk = prediction_result[
            "spoilage_risk"
        ]

        # --------------------------------------------------
        # EXPLANATION
        # --------------------------------------------------

        explanation = explain_prediction(
            food_type=food_type,
            temperature_c=temperature_c,
            humidity_percent=humidity_percent,
            days_since_packaging=days_since_packaging,
            packaging_material=packaging_material,
            storage_condition=storage_condition,
            spoilage_risk=spoilage_risk,
        )

        # --------------------------------------------------
        # RECOMMENDATIONS
        # --------------------------------------------------

        recommendations = get_recommendations(
            food_type=food_type,
            temperature_c=temperature_c,
            humidity_percent=humidity_percent,
            packaging_material=packaging_material,
            storage_condition=storage_condition,
            spoilage_risk=spoilage_risk,
        )

        # --------------------------------------------------
        # FINAL API RESPONSE
        # --------------------------------------------------

        return jsonify(
            {
                "success": True,

                "prediction": {
                    "spoilage_risk": spoilage_risk,

                    "confidence": prediction_result[
                        "confidence"
                    ],

                    "remaining_shelf_life_days": (
                        prediction_result[
                            "remaining_shelf_life_days"
                        ]
                    ),
                },

                "explanation": explanation,

                "recommendations": recommendations,
            }
        )

    except Exception as error:

        return jsonify(
            {
                "success": False,
                "error": str(error),
            }
        ), 500