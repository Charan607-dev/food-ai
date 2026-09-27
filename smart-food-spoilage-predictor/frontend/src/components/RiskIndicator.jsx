function RiskIndicator({ risk, confidence }) {
    const riskValue = risk || "Unknown";

    let riskClass = "risk-unknown";

    if (riskValue === "Safe") {
        riskClass = "risk-safe";
    } else if (riskValue === "Warning") {
        riskClass = "risk-warning";
    } else if (riskValue === "High Risk") {
        riskClass = "risk-high";
    }

    const riskConfidence = confidence?.[riskValue];

    const confidencePercentage =
        riskConfidence !== undefined
            ? Math.round(riskConfidence * 100)
            : 0;

    return (
        <div className={`risk-indicator ${riskClass}`}>

            <div className="risk-indicator-header">
                <div>
                    <p className="result-label">
                        AI SPOILAGE ASSESSMENT
                    </p>

                    <h2>
                        {riskValue}
                    </h2>
                </div>

                <div className="risk-badge">
                    {riskValue}
                </div>
            </div>


            <div className="confidence-section">

                <div className="confidence-header">
                    <span>
                        Model Confidence
                    </span>

                    <strong>
                        {confidencePercentage}%
                    </strong>
                </div>


                <div className="confidence-bar">
                    <div
                        className="confidence-fill"
                        style={{
                            width: `${confidencePercentage}%`,
                        }}
                    />
                </div>

            </div>


            {confidence && (
                <div className="confidence-breakdown">

                    <div className="confidence-item">
                        <span>
                            Safe
                        </span>

                        <strong>
                            {Math.round(
                                (confidence["Safe"] || 0) *
                                100
                            )}%
                        </strong>
                    </div>


                    <div className="confidence-item">
                        <span>
                            Warning
                        </span>

                        <strong>
                            {Math.round(
                                (confidence["Warning"] || 0) *
                                100
                            )}%
                        </strong>
                    </div>


                    <div className="confidence-item">
                        <span>
                            High Risk
                        </span>

                        <strong>
                            {Math.round(
                                (confidence["High Risk"] || 0) *
                                100
                            )}%
                        </strong>
                    </div>

                </div>
            )}

        </div>
    );
}


export default RiskIndicator;