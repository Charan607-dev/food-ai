def explain_prediction(
    food_type,
    temperature_c,
    humidity_percent,
    days_since_packaging,
    packaging_material,
    storage_condition,
    spoilage_risk,
):
    factors = []

    # Temperature
    if temperature_c > 8:
        factors.append(
            f"Temperature is relatively high at {temperature_c}°C."
        )
    elif temperature_c > 5:
        factors.append(
            f"Temperature is moderately elevated at {temperature_c}°C."
        )
    else:
        factors.append(
            f"Temperature is relatively low at {temperature_c}°C."
        )

    # Humidity
    if humidity_percent > 80:
        factors.append(
            f"Humidity is high at {humidity_percent}%."
        )
    elif humidity_percent > 65:
        factors.append(
            f"Humidity is moderately high at {humidity_percent}%."
        )
    else:
        factors.append(
            f"Humidity is relatively controlled at {humidity_percent}%."
        )

    # Product age
    if days_since_packaging >= 5:
        factors.append(
            f"The product has been packaged for {days_since_packaging} days."
        )
    else:
        factors.append(
            f"The product has been packaged for {days_since_packaging} days."
        )

    # Storage
    factors.append(
        f"Storage condition is {storage_condition}."
    )

    # Packaging
    factors.append(
        f"Packaging material used is {packaging_material}."
    )

    # Overall explanation
    explanation = (
        f"The model classified {food_type} as "
        f"'{spoilage_risk}' based on the provided "
        "storage, environmental, packaging, and product-age conditions."
    )

    return {
        "summary": explanation,
        "factors": factors,
    }