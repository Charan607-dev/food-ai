import { useState } from "react";

const foods = [
    {
        name: "Milk",
        icon: "🥛",
        description: "Fresh dairy milk",
    },
    {
        name: "Paneer",
        icon: "🧀",
        description: "Fresh cottage cheese",
    },
    {
        name: "Curd",
        icon: "🥣",
        description: "Fermented dairy",
    },
    {
        name: "Cheese",
        icon: "🧀",
        description: "Processed cheese",
    },
    {
        name: "Yogurt",
        icon: "🥛",
        description: "Cultured dairy",
    },
    {
        name: "Butter",
        icon: "🧈",
        description: "Dairy butter",
    },
];


const foodIcons = {
    Milk: "🥛",
    Paneer: "🧀",
    Curd: "🥣",
    Cheese: "🧀",
    Yogurt: "🥛",
    Butter: "🧈",
};


function FoodInputForm({ onPredict, loading, onStepChange }) {

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        food_type: "",
        temperature_c: 7,
        humidity_percent: 70,
        days_since_packaging: 4,
        packaging_material: "PLA Film",
        storage_condition: "Refrigerated",
    });


    function selectFood(foodName) {
        setFormData((previous) => ({
            ...previous,
            food_type: foodName,
        }));
    }


    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }


    function goToDetails() {
        if (!formData.food_type) {
            return;
        }

        setStep(2);
        onStepChange?.(2);
    }


    function goBackToFoodSelection() {
        setStep(1);
        onStepChange?.(1);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const data = {
            food_type: formData.food_type,
            temperature_c: Number(
                formData.temperature_c
            ),
            humidity_percent: Number(
                formData.humidity_percent
            ),
            days_since_packaging: Number(
                formData.days_since_packaging
            ),
            packaging_material:
                formData.packaging_material,
            storage_condition:
                formData.storage_condition,
        };

        onPredict(data);
    }


    return (
        <div className="food-input-card">

            {/* =========================
                STEP 1
            ========================= */}

            {step === 1 && (
                <div className="food-selection-step">

                    <div className="form-title-row">

                        <div className="form-title-icon">
                            🍽️
                        </div>

                        <div className="form-header">

                            <p className="form-eyebrow">
                                STEP 1 OF 2
                            </p>

                            <h2>
                                Choose Your Food
                            </h2>

                            <p>
                                Select the food product you
                                want to analyze.
                            </p>

                        </div>

                    </div>


                    <div className="food-card-grid">

                        {foods.map((food) => {

                            const isSelected =
                                formData.food_type ===
                                food.name;

                            return (
                                <button
                                    type="button"
                                    key={food.name}
                                    className={
                                        isSelected
                                            ? "food-choice-card selected"
                                            : "food-choice-card"
                                    }
                                    onClick={() =>
                                        selectFood(
                                            food.name
                                        )
                                    }
                                >

                                    <div className="food-choice-icon">
                                        {food.icon}
                                    </div>

                                    <div className="food-choice-name">
                                        {food.name}
                                    </div>

                                    <div className="food-choice-description">
                                        {food.description}
                                    </div>

                                    {isSelected && (
                                        <div className="food-selected-check">
                                            ✓
                                        </div>
                                    )}

                                </button>
                            );

                        })}

                    </div>


                    <button
                        type="button"
                        className="continue-button"
                        disabled={!formData.food_type}
                        onClick={goToDetails}
                    >

                        <span>
                            Continue with{" "}
                            {formData.food_type || "Food"}
                        </span>

                        <span>
                            →
                        </span>

                    </button>

                </div>
            )}


            {/* =========================
                STEP 2
            ========================= */}

            {step === 2 && (
                <div className="food-details-step">

                    <div className="form-title-row">

                        <div className="form-title-icon">
                            {foodIcons[
                                formData.food_type
                            ]}
                        </div>

                        <div className="form-header">

                            <p className="form-eyebrow">
                                STEP 2 OF 2
                            </p>

                            <h2>
                                {formData.food_type}
                                {" "}Conditions
                            </h2>

                            <p>
                                Enter the storage and
                                packaging conditions.
                            </p>

                        </div>

                    </div>


                    {/* SELECTED FOOD */}

                    <div className="selected-food-summary">

                        <div className="selected-food-summary-icon">
                            {foodIcons[
                                formData.food_type
                            ]}
                        </div>

                        <div>

                            <span>
                                SELECTED FOOD
                            </span>

                            <strong>
                                {formData.food_type}
                            </strong>

                        </div>


                        <button
                            type="button"
                            onClick={
                                goBackToFoodSelection
                            }
                        >
                            Change
                        </button>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="food-input-form"
                    >

                        {/* TEMPERATURE */}

                        <div className="form-group">

                            <label htmlFor="temperature_c">
                                🌡️ Temperature (°C)
                            </label>

                            <div className="input-wrapper">

                                <span className="field-icon">
                                    🌡️
                                </span>

                                <input
                                    id="temperature_c"
                                    type="number"
                                    name="temperature_c"
                                    value={
                                        formData.temperature_c
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    step="0.1"
                                    required
                                />

                            </div>

                        </div>


                        {/* HUMIDITY */}

                        <div className="form-group">

                            <label htmlFor="humidity_percent">
                                💧 Humidity (%)
                            </label>

                            <div className="input-wrapper">

                                <span className="field-icon">
                                    💧
                                </span>

                                <input
                                    id="humidity_percent"
                                    type="number"
                                    name="humidity_percent"
                                    value={
                                        formData.humidity_percent
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    required
                                />

                            </div>

                        </div>


                        {/* DAYS */}

                        <div className="form-group">

                            <label htmlFor="days_since_packaging">
                                📅 Days Since Packaging
                            </label>

                            <div className="input-wrapper">

                                <span className="field-icon">
                                    📅
                                </span>

                                <input
                                    id="days_since_packaging"
                                    type="number"
                                    name="days_since_packaging"
                                    value={
                                        formData.days_since_packaging
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    min="0"
                                    required
                                />

                            </div>

                        </div>


                        {/* PACKAGING */}

                        <div className="form-group">

                            <label htmlFor="packaging_material">
                                📦 Packaging Material
                            </label>

                            <div className="input-wrapper">

                                <span className="field-icon">
                                    📦
                                </span>

                                <select
                                    id="packaging_material"
                                    name="packaging_material"
                                    value={
                                        formData.packaging_material
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Kraft Paper">
                                        Kraft Paper
                                    </option>

                                    <option value="Moulded Bagasse Pulp">
                                        Moulded Bagasse Pulp
                                    </option>

                                    <option value="PLA Film">
                                        PLA Film
                                    </option>

                                    <option value="Cellulose Film">
                                        Cellulose Film
                                    </option>

                                    <option value="Glass Container">
                                        Glass Container
                                    </option>

                                    <option value="Vacuum Pack">
                                        Vacuum Pack
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* STORAGE */}

                        <div className="form-group">

                            <label htmlFor="storage_condition">
                                ❄️ Storage Condition
                            </label>

                            <div className="input-wrapper">

                                <span className="field-icon">
                                    ❄️
                                </span>

                                <select
                                    id="storage_condition"
                                    name="storage_condition"
                                    value={
                                        formData.storage_condition
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Refrigerated">
                                        Refrigerated
                                    </option>

                                    <option value="Room Temperature">
                                        Room Temperature
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* BUTTONS */}

                        <div className="details-buttons">

                            <button
                                type="button"
                                className="back-button"
                                onClick={
                                    goBackToFoodSelection
                                }
                            >
                                ← Back
                            </button>


                            <button
                                type="submit"
                                className="predict-button"
                                disabled={loading}
                            >

                                <span>
                                    ✦
                                </span>

                                <span>
                                    {loading
                                        ? "Analyzing Food..."
                                        : "Predict Spoilage"}
                                </span>

                                {!loading && (
                                    <span>
                                        →
                                    </span>
                                )}

                            </button>

                        </div>

                    </form>

                </div>
            )}

        </div>
    );
}


export default FoodInputForm;