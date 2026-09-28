import { useEffect, useState } from "react";

import RiskIndicator from "../components/RiskIndicator";
import PredictionCard from "../components/PredictionCard";
import ExplanationCard from "../components/ExplanationCard";
import RecommendationCard from "../components/RecommendationCard";

const HISTORY_KEY = "food_spoilage_prediction_history";

const foodIcons = {
    Milk: "🥛",
    Paneer: "🧀",
    Curd: "🥣",
    Cheese: "🧀",
    Yogurt: "🥛",
    Butter: "🧈",
};

function History() {
    const [history, setHistory] = useState([]);
    const [selectedPrediction, setSelectedPrediction] =
        useState(null);

    useEffect(() => {
        loadHistory();
    }, []);

    function loadHistory() {
        const savedHistory =
            localStorage.getItem(HISTORY_KEY);

        if (!savedHistory) {
            setHistory([]);
            return;
        }

        try {
            setHistory(JSON.parse(savedHistory));
        } catch (error) {
            console.error(
                "Failed to load prediction history:",
                error
            );

            setHistory([]);
        }
    }

    function openPrediction(item) {
        setSelectedPrediction(item);
    }

    function closePrediction() {
        setSelectedPrediction(null);
    }

    // Delete one history item
    function deletePrediction(event, id) {
        event.stopPropagation();

        const updatedHistory = history.filter(
            (item) => item.id !== id
        );

        setHistory(updatedHistory);

        localStorage.setItem(
            HISTORY_KEY,
            JSON.stringify(updatedHistory)
        );
    }

    // Delete all history
    function clearHistory() {
        const confirmed = window.confirm(
            "Are you sure you want to delete all prediction history?"
        );

        if (!confirmed) {
            return;
        }

        localStorage.removeItem(HISTORY_KEY);

        setHistory([]);
        setSelectedPrediction(null);
    }

    /*
     * ==========================================
     * FULL PREDICTION DETAILS
     * ==========================================
     */

    if (selectedPrediction) {
        const item = selectedPrediction;

        return (
            <div className="history-page">

                <section className="history-header">

                    <button
                        type="button"
                        className="history-back-button"
                        onClick={closePrediction}
                    >
                        ← Back to History
                    </button>

                    <p className="eyebrow">
                        PREDICTION DETAILS
                    </p>

                    <h1>
                        {item.formData?.food_type ||
                            "Food"} Prediction
                    </h1>

                    <p>
                        Prediction made on {item.date}
                    </p>

                </section>


                <section className="prediction-results">

                    <RiskIndicator
                        risk={
                            item.prediction
                                ?.spoilage_risk
                        }
                        confidence={
                            item.prediction
                                ?.confidence
                        }
                    />


                    <PredictionCard
                        prediction={
                            item.prediction
                        }
                        foodData={
                            item.formData
                        }
                    />


                    <ExplanationCard
                        explanation={
                            item.explanation
                        }
                    />


                    <RecommendationCard
                        recommendations={
                            item.recommendations
                        }
                    />

                </section>

            </div>
        );
    }


    /*
     * ==========================================
     * EMPTY HISTORY
     * ==========================================
     */

    if (history.length === 0) {
        return (
            <div className="history-page">

                <section className="history-header">

                    <p className="eyebrow">
                        PREDICTION HISTORY
                    </p>

                    <h1>
                        Prediction History
                    </h1>

                    <p>
                        View your previous food spoilage
                        predictions in one place.
                    </p>

                </section>


                <section className="history-empty">

                    <div className="history-icon">
                        📋
                    </div>

                    <h2>
                        No prediction history yet
                    </h2>

                    <p>
                        Your prediction records will
                        appear here after you make a
                        prediction.
                    </p>

                </section>

            </div>
        );
    }


    /*
     * ==========================================
     * HISTORY LIST
     * ==========================================
     */

    return (
        <div className="history-page">

            <section className="history-header">

                <p className="eyebrow">
                    PREDICTION HISTORY
                </p>

                <h1>
                    Prediction History
                </h1>

                <p>
                    View your previous food spoilage
                    predictions in one place.
                </p>

            </section>


            <section className="history-content">

                {/* TOP BAR */}

                <div className="history-topbar">

                    <div>
                        <h2>
                            Previous Predictions
                        </h2>

                        <p>
                            {history.length} prediction
                            {history.length !== 1
                                ? "s"
                                : ""}{" "}
                            recorded
                        </p>
                    </div>


                    <button
                        type="button"
                        className="clear-history-btn"
                        onClick={clearHistory}
                    >
                        🗑️ Clear History
                    </button>

                </div>


                {/* HISTORY CARDS */}

                <div className="history-list">

                    {history.map((item) => {

                        const food =
                            item.formData
                                ?.food_type ||
                            "Food";

                        const risk =
                            item.prediction
                                ?.spoilage_risk ||
                            "Unknown";

                        return (

                            <article
                                className="history-card"
                                key={item.id}
                                onClick={() =>
                                    openPrediction(item)
                                }
                            >

                                {/* FOOD ICON */}

                                <div className="history-card-icon">

                                    {foodIcons[food] ||
                                        "🍽️"}

                                </div>


                                {/* MAIN CONTENT */}

                                <div className="history-card-main">

                                    <div className="history-card-title">

                                        <div>

                                            <h3>
                                                {food}
                                            </h3>

                                            <p className="history-date">
                                                {item.date}
                                            </p>

                                        </div>


                                        <span
                                            className={`history-risk ${risk
                                                .toLowerCase()
                                                .replace(
                                                    /\s+/g,
                                                    "-"
                                                )}`}
                                        >
                                            {risk}
                                        </span>

                                    </div>


                                    {/* DETAILS */}

                                    <div className="history-card-details">

                                        <div className="history-detail">
                                            <span>🌡️</span>
                                            <div>
                                                <small>
                                                    Temperature
                                                </small>
                                                <strong>
                                                    {
                                                        item
                                                            .formData
                                                            ?.temperature_c
                                                    }°C
                                                </strong>
                                            </div>
                                        </div>


                                        <div className="history-detail">
                                            <span>💧</span>
                                            <div>
                                                <small>
                                                    Humidity
                                                </small>
                                                <strong>
                                                    {
                                                        item
                                                            .formData
                                                            ?.humidity_percent
                                                    }%
                                                </strong>
                                            </div>
                                        </div>


                                        <div className="history-detail">
                                            <span>📅</span>
                                            <div>
                                                <small>
                                                    Packaging Age
                                                </small>
                                                <strong>
                                                    {
                                                        item
                                                            .formData
                                                            ?.days_since_packaging
                                                    }{" "}
                                                    days
                                                </strong>
                                            </div>
                                        </div>


                                        <div className="history-detail">
                                            <span>📦</span>
                                            <div>
                                                <small>
                                                    Packaging
                                                </small>
                                                <strong>
                                                    {
                                                        item
                                                            .formData
                                                            ?.packaging_material
                                                    }
                                                </strong>
                                            </div>
                                        </div>


                                        <div className="history-detail">
                                            <span>❄️</span>
                                            <div>
                                                <small>
                                                    Storage
                                                </small>
                                                <strong>
                                                    {
                                                        item
                                                            .formData
                                                            ?.storage_condition
                                                    }
                                                </strong>
                                            </div>
                                        </div>

                                    </div>

                                </div>


                                {/* ACTIONS */}

                                <div className="history-card-actions">

                                    <button
                                        type="button"
                                        className="history-delete-btn"
                                        title="Delete this prediction"
                                        onClick={(event) =>
                                            deletePrediction(
                                                event,
                                                item.id
                                            )
                                        }
                                    >
                                        🗑️
                                    </button>


                                    <span className="history-card-arrow">
                                        →
                                    </span>

                                </div>

                            </article>
                        );
                    })}

                </div>

            </section>

        </div>
    );
}

export default History;