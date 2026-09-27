import csv
import random
from pathlib import Path


OUTPUT_FILE = (
    Path(__file__).parent.parent
    / "data"
    / "raw"
    / "food_spoilage_dataset.csv"
)


FOODS = {
    "Milk": 7,
    "Paneer": 7,
    "Curd": 10,
    "Cheese": 30,
    "Yogurt": 14,
    "Butter": 60,
}


PACKAGING_MATERIALS = [
    "Kraft Paper",
    "Moulded Bagasse Pulp",
    "PLA Film",
    "Cellulose Film",
    "Glass Container",
    "Vacuum Pack",
]


STORAGE_CONDITIONS = [
    "Refrigerated",
    "Room Temperature",
]


def calculate_risk(
    food_type,
    temperature,
    humidity,
    days_since_packaging,
    packaging_material,
    storage_condition,
):
    shelf_life = FOODS[food_type]

    score = 0

    # Temperature
    if storage_condition == "Refrigerated":
        if temperature > 8:
            score += 3
        elif temperature > 5:
            score += 1
    else:
        score += 4

    # Humidity
    if humidity > 80:
        score += 2
    elif humidity > 65:
        score += 1

    # Age of product
    usage_ratio = days_since_packaging / shelf_life

    if usage_ratio >= 1:
        score += 5
    elif usage_ratio >= 0.75:
        score += 3
    elif usage_ratio >= 0.50:
        score += 1

    # Packaging influence
    if packaging_material in ["Vacuum Pack", "Glass Container"]:
        score -= 1

    # Natural variation
    score += random.choice([-1, 0, 0, 0, 1])

    if score <= 2:
        risk = "Safe"
    elif score <= 5:
        risk = "Warning"
    else:
        risk = "High Risk"

    remaining_days = max(
        0,
        round(shelf_life - days_since_packaging - score * 0.3, 1),
    )

    return risk, remaining_days


def generate_dataset(rows=3000):

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    columns = [
        "food_type",
        "temperature_c",
        "humidity_percent",
        "days_since_packaging",
        "packaging_material",
        "storage_condition",
        "expected_shelf_life_days",
        "spoilage_risk",
        "remaining_shelf_life_days",
    ]

    with open(
        OUTPUT_FILE,
        "w",
        newline="",
        encoding="utf-8",
    ) as file:

        writer = csv.DictWriter(file, fieldnames=columns)
        writer.writeheader()

        for _ in range(rows):

            food_type = random.choice(list(FOODS.keys()))

            temperature = round(
                random.uniform(2, 35),
                1,
            )

            humidity = round(
                random.uniform(35, 95),
                1,
            )

            shelf_life = FOODS[food_type]

            days_since_packaging = random.randint(
                0,
                shelf_life + 5,
            )

            packaging_material = random.choice(
                PACKAGING_MATERIALS
            )

            storage_condition = random.choice(
                STORAGE_CONDITIONS
            )

            risk, remaining_days = calculate_risk(
                food_type,
                temperature,
                humidity,
                days_since_packaging,
                packaging_material,
                storage_condition,
            )

            writer.writerow(
                {
                    "food_type": food_type,
                    "temperature_c": temperature,
                    "humidity_percent": humidity,
                    "days_since_packaging": days_since_packaging,
                    "packaging_material": packaging_material,
                    "storage_condition": storage_condition,
                    "expected_shelf_life_days": shelf_life,
                    "spoilage_risk": risk,
                    "remaining_shelf_life_days": remaining_days,
                }
            )

    print("Dataset generated successfully!")
    print(f"Rows: {rows}")
    print(f"Saved to: {OUTPUT_FILE}")


if __name__ == "__main__":
    generate_dataset()