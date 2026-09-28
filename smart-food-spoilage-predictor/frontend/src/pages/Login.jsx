import { useState } from "react";

function Login({ onLogin }) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            setError("Please enter your name.");
            return;
        }

        if (trimmedName.length < 2) {
            setError("Please enter at least 2 characters.");
            return;
        }

        localStorage.setItem(
            "food_spoilage_current_user",
            trimmedName
        );

        onLogin(trimmedName);
    }

    return (
        <div className="login-page">

            {/* =========================================
                ANIMATED BACKGROUND
            ========================================== */}

            <div className="login-background">

                <div className="gradient-orb orb-one"></div>
                <div className="gradient-orb orb-two"></div>
                <div className="gradient-orb orb-three"></div>
                <div className="gradient-orb orb-four"></div>

                <div className="grid-overlay"></div>

                {/* Animated particles */}

                <span className="particle particle-1"></span>
                <span className="particle particle-2"></span>
                <span className="particle particle-3"></span>
                <span className="particle particle-4"></span>
                <span className="particle particle-5"></span>
                <span className="particle particle-6"></span>
                <span className="particle particle-7"></span>
                <span className="particle particle-8"></span>
                <span className="particle particle-9"></span>
                <span className="particle particle-10"></span>

            </div>


            {/* =========================================
                FLOATING FOOD
            ========================================== */}

            <div className="floating-food food-one">
                🥛
            </div>

            <div className="floating-food food-two">
                🧀
            </div>

            <div className="floating-food food-three">
                🧈
            </div>

            <div className="floating-food food-four">
                🥣
            </div>

            <div className="floating-food food-five">
                🌿
            </div>

            <div className="floating-food food-six">
                🥛
            </div>

            <div className="floating-food food-seven">
                🧀
            </div>


            {/* =========================================
                LOGIN CARD
            ========================================== */}

            <div className="login-card">

                {/* Moving shine */}

                <div className="card-shine"></div>


                {/* AI BADGE */}

                <div className="login-badge">

                    <span className="badge-dot"></span>

                    <span>
                        AI-POWERED FOOD SAFETY
                    </span>

                </div>


                {/* =====================================
                    LOGO AREA
                ====================================== */}

                <div className="login-logo-wrapper">

                    <div className="logo-orbit orbit-one"></div>
                    <div className="logo-orbit orbit-two"></div>

                    <div className="orbit-dot dot-one"></div>
                    <div className="orbit-dot dot-two"></div>

                    <div className="login-logo">
                        🥗
                    </div>

                </div>


                {/* =====================================
                    HEADING
                ====================================== */}

                <h1>
                    Welcome to
                    <span>
                        Smart Food Safety
                    </span>
                </h1>


                <p className="login-description">
                    Predict food spoilage risk using AI
                    and make smarter food storage decisions.
                </p>


                {/* =====================================
                    LOGIN FORM
                ====================================== */}

                <form onSubmit={handleSubmit}>

                    <label htmlFor="username">
                        Your Name
                    </label>


                    <div className="login-input-wrapper">

                        <span className="input-icon">
                            👤
                        </span>

                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                                setError("");
                            }}
                            autoComplete="name"
                        />

                        <span className="input-glow"></span>

                    </div>


                    {error && (
                        <p className="login-error">
                            ⚠️ {error}
                        </p>
                    )}


                    <button
                        type="submit"
                        className="login-button"
                    >

                        <span className="button-shine"></span>

                        <span className="button-content">
                            Continue to Dashboard
                        </span>

                        <span className="button-arrow">
                            →
                        </span>

                    </button>

                </form>


                {/* =====================================
                    FEATURES
                ====================================== */}

                <div className="login-features">

                    <div className="login-feature">
                        <span>🤖</span>
                        <small>AI Analysis</small>
                    </div>


                    <div className="feature-divider"></div>


                    <div className="login-feature">
                        <span>🛡️</span>
                        <small>Food Safety</small>
                    </div>


                    <div className="feature-divider"></div>


                    <div className="login-feature">
                        <span>🌿</span>
                        <small>Less Waste</small>
                    </div>

                </div>


                <p className="login-footer">
                    Smart predictions • Safer food • Less waste
                </p>

            </div>

        </div>
    );
}

export default Login;