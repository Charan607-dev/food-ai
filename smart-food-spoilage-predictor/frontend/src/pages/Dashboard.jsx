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

    // Track which step the user is on
    const [currentStep, setCurrentStep] = useState(1);

    async function handlePrediction(formData) {
        setLoading(true);
        setError("");
        setLastFormData(formData);

        try {
            const data = await predictSpoilage(formData);

            setResult(data);
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
    }

    return (
        <div className="dashboard">

            {/* HERO */}

            <section className="dashboard-hero">

                <div className="hero-content">

                    <div className="hero-badge">
                        <span>✦</span>
                        AI-POWERED FOOD SAFETY
                    </div>

                    <h1>
                        Smarter Food Choices,
                        <span> Less Food Waste.</span>
                    </h1>

                    <p>
                        Predict food spoilage risk, estimate
                        remaining shelf life, and get smart
                        storage recommendations using AI.
                    </p>

                    <div className="hero-highlights">

                        <div className="hero-highlight">
                            <span>🤖</span>

                            <div>
                                <strong>AI Analysis</strong>
                                <small>
                                    Smart predictions
                                </small>
                            </div>
                        </div>

                        <div className="hero-highlight">
                            <span>🛡️</span>

                            <div>
                                <strong>Food Safety</strong>
                                <small>
                                    Know the risk
                                </small>
                            </div>
                        </div>

                        <div className="hero-highlight">
                            <span>🌿</span>

                            <div>
                                <strong>Less Waste</strong>
                                <small>
                                    Save food
                                </small>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="hero-bento-visual">
                    <InteractiveBentoGallery />
                </div>

            </section>


            {/* MAIN APPLICATION */}

            <section
                className={
                    currentStep === 1
                        ? "dashboard-grid step-one-layout"
                        : "dashboard-grid"
                }
            >

                <div className="input-section">

                    <FoodInputForm
                        onPredict={handlePrediction}
                        loading={loading}
                        onStepChange={handleStepChange}
                    />

                </div>


                <div className="results-section">

                    {/* STEP 1 */}

                    {currentStep === 1 &&
                        !result &&
                        !loading && (
                            <div className="step-placeholder">

                                <div className="placeholder-icon">
                                    🍽️
                                </div>

                                <h2>
                                    Choose Your Food
                                </h2>

                                <p>
                                    Select a food product from
                                    the cards to begin your
                                    analysis.
                                </p>

                            </div>
                        )}


                    {/* STEP 2 */}

                    {currentStep === 2 &&
                        !result &&
                        !loading && (
                            <div className="empty-result">

                                <div className="empty-food-visual">
                                    🥗
                                </div>

                                <h2>
                                    Ready for prediction
                                </h2>

                                <p>
                                    Enter the food and storage
                                    conditions, then click
                                    "Predict Spoilage".
                                </p>

                                <div className="empty-features">

                                    <div>
                                        <span>🧠</span>

                                        <strong>
                                            AI Analysis
                                        </strong>

                                        <small>
                                            ML-based prediction
                                        </small>
                                    </div>

                                    <div>
                                        <span>🛡️</span>

                                        <strong>
                                            Food Safety
                                        </strong>

                                        <small>
                                            Risk assessment
                                        </small>
                                    </div>

                                    <div>
                                        <span>🌱</span>

                                        <strong>
                                            Less Waste
                                        </strong>

                                        <small>
                                            Better decisions
                                        </small>
                                    </div>

                                    <div>
                                        <span>❤️</span>

                                        <strong>
                                            Healthier Food
                                        </strong>

                                        <small>
                                            Fresh food
                                        </small>
                                    </div>

                                </div>

                            </div>
                        )}


                    {/* LOADING */}

                    {loading && (
                        <div className="loading-result">

                            <div className="loading-spinner">
                                ⟳
                            </div>

                            <h2>
                                Analyzing food conditions...
                            </h2>

                            <p>
                                Our AI model is evaluating
                                spoilage risk and remaining
                                shelf life.
                            </p>

                        </div>
                    )}


                    {/* ERROR */}

                    {error && (
                        <div className="error-message">

                            <h3>
                                Prediction Error
                            </h3>

                            <p>
                                {error}
                            </p>

                            <p>
                                Make sure the Flask backend
                                is running on port 5000.
                            </p>

                        </div>
                    )}


                    {/* PREDICTION RESULTS */}

                    {result && !loading && (
                        <div className="prediction-results">

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

        </div>
    );
}

export default Dashboard;