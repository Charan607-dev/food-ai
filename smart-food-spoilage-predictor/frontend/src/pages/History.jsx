import { useEffect, useState } from "react";

import RiskIndicator from "../components/RiskIndicator";
import PredictionCard from "../components/PredictionCard";
import ExplanationCard from "../components/ExplanationCard";
import RecommendationCard from "../components/RecommendationCard";


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


    // ==========================================
    // GET CURRENT USER
    // ==========================================

    const currentUser =
        localStorage.getItem(
            "food_spoilage_current_user"
        );


    // ==========================================
    // CREATE USER-SPECIFIC HISTORY KEY
    // ==========================================

    const HISTORY_KEY = currentUser
        ? `food_spoilage_history_${currentUser}`
        : null;


    // ==========================================
    // LOAD CURRENT USER'S HISTORY
    // ==========================================

    useEffect(() => {

        if (!HISTORY_KEY) {
            setHistory([]);
            return;
        }


        const savedHistory =
            localStorage.getItem(HISTORY_KEY);


        if (!savedHistory) {
            setHistory([]);
            return;
        }


        try {

            setHistory(
                JSON.parse(savedHistory)
            );

        } catch (error) {

            console.error(
                "Failed to load history:",
                error
            );

            setHistory([]);
        }

    }, [HISTORY_KEY]);


    // ==========================================
    // OPEN PREDICTION
    // ==========================================

    function openPrediction(item) {
        setSelectedPrediction(item);
    }


    // ==========================================
    // CLOSE PREDICTION
    // ==========================================

    function closePrediction() {
        setSelectedPrediction(null);
    }


    // ==========================================
    // DELETE ONE PREDICTION
    // ==========================================

    function deletePrediction(event, id) {

        event.stopPropagation();


        const updatedHistory =
            history.filter(
                (item) => item.id !== id
            );


        setHistory(updatedHistory);


        if (HISTORY_KEY) {

            localStorage.setItem(
                HISTORY_KEY,
                JSON.stringify(updatedHistory)
            );

        }
    }


    // ==========================================
    // CLEAR ALL CURRENT USER HISTORY
    // ==========================================

    function clearHistory() {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete all your prediction history?"
            );


        if (!confirmed) {
            return;
        }


        if (HISTORY_KEY) {
            localStorage.removeItem(
                HISTORY_KEY
            );
        }


        setHistory([]);
        setSelectedPrediction(null);
    }


    // ==========================================
    // FULL PREDICTION DETAILS
    // ==========================================

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


    // ==========================================
    // NO USER HISTORY
    // ==========================================

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
                        View your previous food
                        spoilage predictions in
                        one place.
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
                        appear here after you make
                        a prediction.
                    </p>

                </section>

            </div>
        );
    }


    // ==========================================
    // HISTORY LIST
    // ==========================================

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
                            {currentUser
                                ? `${currentUser}'s Predictions`
                                : "Previous Predictions"}
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

                                            <span>
                                                🌡️
                                            </span>

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

                                            <span>
                                                💧
                                            </span>

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

                                            <span>
                                                📅
                                            </span>

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

                                            <span>
                                                📦
                                            </span>

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

                                            <span>
                                                ❄️
                                            </span>

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