def get_recommendations(
    food_type,
    temperature_c,
    humidity_percent,
    packaging_material,
    storage_condition,
    spoilage_risk,
):
    recommendations = []

    # Temperature recommendations
    if storage_condition == "Room Temperature":
        recommendations.append(
            "Move the product to refrigerated storage to reduce spoilage risk."
        )

    if temperature_c > 8:
        recommendations.append(
            "Reduce the storage temperature because the current temperature is high for refrigerated food."
        )

    # Humidity recommendations
    if humidity_percent > 80:
        recommendations.append(
            "Reduce humidity and improve moisture control around the food package."
        )

    # Packaging recommendations
    if packaging_material in [
        "Kraft Paper",
        "Moulded Bagasse Pulp",
    ]:
        recommendations.append(
            "Consider a moisture-resistant food-grade packaging layer for better protection."
        )

    if packaging_material == "PLA Film":
        recommendations.append(
            "Ensure the PLA packaging provides adequate moisture and oxygen barrier properties for the selected food."
        )

    # Risk-based recommendations
    if spoilage_risk == "High Risk":
        recommendations.append(
            "Prioritize immediate consumption, quality inspection, or appropriate disposal according to food-safety procedures."
        )

    elif spoilage_risk == "Warning":
        recommendations.append(
            "Monitor the product closely and maintain stable refrigerated storage."
        )

    else:
        recommendations.append(
            "Continue maintaining stable storage conditions and proper packaging."
        )

    return recommendations