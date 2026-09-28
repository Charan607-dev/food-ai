import { useState } from "react";

import FoodInputForm from "../components/FoodInputForm";
import PredictionCard from "../components/PredictionCard";
import RiskIndicator from "../components/RiskIndicator";
import ExplanationCard from "../components/ExplanationCard";
import RecommendationCard from "../components/RecommendationCard";
import InteractiveBentoGallery from "../components/InteractiveBentoGallery";

import { predictSpoilage } from "../services/api";


function Dashboard() {

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [lastFormData, setLastFormData] = useState(null);

    const [currentStep, setCurrentStep] = useState(1);


    async function handlePrediction(formData) {

        setLoading(true);
        setError("");
        setLastFormData(formData);

        try {

            const data = await predictSpoilage(formData);

            setResult(data);


            // ==========================================
            // GET CURRENT LOGGED-IN USER
            // ==========================================

            const currentUser =
                localStorage.getItem(
                    "food_spoilage_current_user"
                );


            if (!currentUser) {

                console.warn(
                    "No logged-in user found."
                );

                return;
            }


            // ==========================================
            // USER-SPECIFIC HISTORY KEY
            // ==========================================

            const HISTORY_KEY =
                `food_spoilage_history_${currentUser}`;


            // ==========================================
            // LOAD USER HISTORY
            // ==========================================

            const savedHistory =
                localStorage.getItem(HISTORY_KEY);

            let history = [];


            if (savedHistory) {

                try {

                    history =
                        JSON.parse(savedHistory);

                } catch (error) {

                    console.error(
                        "Failed to read prediction history:",
                        error
                    );

                    history = [];
                }
            }


            // ==========================================
            // CREATE HISTORY ITEM
            // ==========================================

            const historyItem = {

                id: Date.now(),

                date:
                    new Date().toLocaleString(),

                formData: {
                    ...formData,
                },

                prediction:
                    data.prediction,

                explanation:
                    data.explanation,

                recommendations:
                    data.recommendations,
            };


            // Newest prediction first

            history.unshift(historyItem);


            // ==========================================
            // SAVE USER HISTORY
            // ==========================================

            localStorage.setItem(
                HISTORY_KEY,
                JSON.stringify(history)
            );


        } catch (error) {

            setError(
                error.message ||
                "Unable to connect to the prediction server."
            );

        } finally {

            setLoading(false);
        }
    }


    function handleStepChange(step) {

        setCurrentStep(step);

        // Clear old result when starting a new prediction

        if (step === 1) {
            setResult(null);
            setError("");
        }
    }


    const currentUser =
        localStorage.getItem(
            "food_spoilage_current_user"
        );


    return (

        <div className="dashboard">

            {/* =====================================================
                FLOATING BACKGROUND ELEMENTS
                ===================================================== */}

            <div className="dashboard-floating-elements">

                <span className="dashboard-float float-food-1">
                    🥛
                </span>

                <span className="dashboard-float float-food-2">
                    🧀
                </span>

                <span className="dashboard-float float-food-3">
                    🥬
                </span>

                <span className="dashboard-float float-food-4">
                    🌿
                </span>

                <span className="dashboard-float float-food-5">
                    🥣
                </span>

            </div>


            {/* =====================================================
                WELCOME HERO
                ===================================================== */}

            <section className="dashboard-welcome">

                <div className="welcome-content">

                    <div className="welcome-top-row">

                        <div className="dashboard-status">

                            <span className="status-dot"></span>

                            AI SYSTEM ONLINE

                        </div>

                        <div className="welcome-user">

                            👋 Welcome,
                            <strong>
                                {currentUser || "User"}
                            </strong>

                        </div>

                    </div>


                    <h1 className="dashboard-title">

                        Smart Food
                        <span>
                            Safety
                        </span>

                    </h1>


                    <p className="dashboard-subtitle">

                        Predict food spoilage risk,
                        estimate remaining shelf life,
                        and make smarter food storage
                        decisions with AI.

                    </p>


                    {/* =================================================
                        QUICK INFO CARDS
                        ================================================= */}

                    <div className="dashboard-stats">

                        <div className="dashboard-stat-card">

                            <div className="stat-icon">
                                🤖
                            </div>

                            <div>
                                <strong>
                                    AI Analysis
                                </strong>

                                <span>
                                    Smart prediction
                                </span>
                            </div>

                        </div>


                        <div className="dashboard-stat-card">

                            <div className="stat-icon">
                                🛡️
                            </div>

                            <div>
                                <strong>
                                    Food Safety
                                </strong>

                                <span>
                                    Risk assessment
                                </span>
                            </div>

                        </div>


                        <div className="dashboard-stat-card">

                            <div className="stat-icon">
                                🌱
                            </div>

                            <div>
                                <strong>
                                    Less Waste
                                </strong>

                                <span>
                                    Better decisions
                                </span>
                            </div>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    AI VISUAL
                    ===================================================== */}

                <div className="dashboard-ai-visual">

                    <div className="ai-glow"></div>

                    <div className="ai-circle ai-circle-one"></div>
                    <div className="ai-circle ai-circle-two"></div>

                    <div className="ai-center">

                        <span className="ai-brain">
                            🧠
                        </span>

                        <strong>
                            AI
                        </strong>

                        <small>
                            FOOD ANALYSIS
                        </small>

                    </div>


                    <div className="ai-orbit-item orbit-food-a">
                        🥛
                    </div>

                    <div className="ai-orbit-item orbit-food-b">
                        🧀
                    </div>

                    <div className="ai-orbit-item orbit-food-c">
                        🌿
                    </div>

                </div>

            </section>


            {/* =====================================================
                ANALYSIS HEADER
                ===================================================== */}

            <section className="analysis-heading">

                <div>

                    <span className="section-label">
                        AI ANALYSIS
                    </span>

                    <h2>
                        Check Your Food
                    </h2>

                    <p>
                        Enter the food and storage
                        conditions to begin your prediction.
                    </p>

                </div>


                <div className="analysis-step-indicator">

                    <div
                        className={
                            currentStep === 1
                                ? "analysis-step active"
                                : "analysis-step"
                        }
                    >
                        <span>1</span>
                        Food
                    </div>

                    <div className="step-line"></div>

                    <div
                        className={
                            currentStep === 2
                                ? "analysis-step active"
                                : "analysis-step"
                        }
                    >
                        <span>2</span>
                        Conditions
                    </div>

                </div>

            </section>


            {/* =====================================================
                MAIN APPLICATION
                ===================================================== */}

            <section
                className={
                    currentStep === 1
                        ? "dashboard-grid step-one-layout"
                        : "dashboard-grid"
                }
            >

                {/* =================================================
                    INPUT
                    ================================================= */}

                <div className="input-section">

                    <div className="section-card-header">

                        <div>

                            <span>
                                STEP {currentStep}
                            </span>

                            <h3>
                                {currentStep === 1
                                    ? "Select Your Food"
                                    : "Storage Conditions"}
                            </h3>

                        </div>

                        <div className="header-icon">
                            {currentStep === 1
                                ? "🍽️"
                                : "📦"}
                        </div>

                    </div>


                    <FoodInputForm
                        onPredict={handlePrediction}
                        loading={loading}
                        onStepChange={handleStepChange}
                    />

                </div>


                {/* =================================================
                    RESULTS
                    ================================================= */}

                <div className="results-section">


                    {/* =================================================
                        STEP 1 PLACEHOLDER
                        ================================================= */}

                    {currentStep === 1 &&
                        !result &&
                        !loading && (

                            <div className="modern-placeholder">

                                <div className="placeholder-orb">

                                    <span>
                                        🍽️
                                    </span>

                                </div>

                                <span className="placeholder-label">
                                    STEP 01
                                </span>

                                <h2>
                                    Choose Your Food
                                </h2>

                                <p>
                                    Select a food product
                                    from the cards to begin
                                    your AI-powered analysis.
                                </p>


                                <div className="placeholder-points">

                                    <span>
                                        ✓ Food type
                                    </span>

                                    <span>
                                        ✓ Storage conditions
                                    </span>

                                    <span>
                                        ✓ Packaging material
                                    </span>

                                </div>

                            </div>

                        )}


                    {/* =================================================
                        STEP 2 READY STATE
                        ================================================= */}

                    {currentStep === 2 &&
                        !result &&
                        !loading && (

                            <div className="modern-ready-card">

                                <div className="ready-icon">
                                    🧠
                                </div>

                                <span className="placeholder-label">
                                    AI READY
                                </span>

                                <h2>
                                    Ready for Prediction
                                </h2>

                                <p>
                                    Your food and storage
                                    conditions are ready.
                                    Run the AI analysis to
                                    check spoilage risk.
                                </p>


                                <div className="ready-features">

                                    <div>
                                        <span>
                                            🤖
                                        </span>

                                        <strong>
                                            AI Model
                                        </strong>

                                        <small>
                                            ML analysis
                                        </small>
                                    </div>


                                    <div>
                                        <span>
                                            📊
                                        </span>

                                        <strong>
                                            Risk
                                        </strong>

                                        <small>
                                            Assessment
                                        </small>
                                    </div>


                                    <div>
                                        <span>
                                            ⏱️
                                        </span>

                                        <strong>
                                            Shelf Life
                                        </strong>

                                        <small>
                                            Estimation
                                        </small>
                                    </div>

                                </div>

                            </div>

                        )}


                    {/* =================================================
                        LOADING
                        ================================================= */}

                    {loading && (

                        <div className="modern-loading">

                            <div className="loading-ai-ring">

                                <div>
                                    🧠
                                </div>

                            </div>

                            <span className="loading-label">
                                AI ANALYSIS IN PROGRESS
                            </span>

                            <h2>
                                Analyzing Food Conditions...
                            </h2>

                            <p>
                                Our AI model is evaluating
                                spoilage risk and remaining
                                shelf life.
                            </p>


                            <div className="loading-progress">

                                <span></span>

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        ERROR
                        ================================================= */}

                    {error && (

                        <div className="modern-error">

                            <div className="error-icon">
                                ⚠️
                            </div>

                            <div>

                                <span>
                                    ANALYSIS FAILED
                                </span>

                                <h3>
                                    Prediction Error
                                </h3>

                                <p>
                                    {error}
                                </p>

                                <small>
                                    Check that the prediction
                                    service is available and
                                    try again.
                                </small>

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        RESULTS
                        ================================================= */}

                    {result && !loading && (

                        <div className="prediction-results">

                            <div className="result-header">

                                <div>

                                    <span>
                                        AI ANALYSIS COMPLETE
                                    </span>

                                    <h2>
                                        Your Food Safety Result
                                    </h2>

                                </div>

                                <div className="result-success-icon">
                                    ✓
                                </div>

                            </div>


                            <RiskIndicator
                                risk={
                                    result.prediction
                                        ?.spoilage_risk
                                }

                                confidence={
                                    result.prediction
                                        ?.confidence
                                }
                            />


                            <PredictionCard
                                prediction={
                                    result.prediction
                                }

                                foodData={
                                    lastFormData
                                }
                            />


                            <ExplanationCard
                                explanation={
                                    result.explanation
                                }
                            />


                            <RecommendationCard
                                recommendations={
                                    result.recommendations
                                }
                            />

                        </div>

                    )}

                </div>

            </section>


            {/* =====================================================
                BOTTOM AI INFORMATION
                ===================================================== */}

            {!result && !loading && (

                <section className="dashboard-bottom-info">

                    <div className="bottom-info-content">

                        <div>

                            <span className="section-label">
                                HOW IT WORKS
                            </span>

                            <h2>
                                AI-powered food safety
                                in three simple steps.
                            </h2>

                        </div>


                        <div className="bottom-steps">

                            <div className="bottom-step">

                                <span>
                                    01
                                </span>

                                <div>
                                    <strong>
                                        Select
                                    </strong>

                                    <small>
                                        Choose your food
                                    </small>
                                </div>

                            </div>


                            <div className="bottom-step">

                                <span>
                                    02
                                </span>

                                <div>
                                    <strong>
                                        Analyze
                                    </strong>

                                    <small>
                                        Enter conditions
                                    </small>
                                </div>

                            </div>


                            <div className="bottom-step">

                                <span>
                                    03
                                </span>

                                <div>
                                    <strong>
                                        Protect
                                    </strong>

                                    <small>
                                        Follow recommendations
                                    </small>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            )}

        </div>
    );
}


export default Dashboard;