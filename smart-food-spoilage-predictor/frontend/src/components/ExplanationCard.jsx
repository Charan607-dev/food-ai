function ExplanationCard({ explanation }) {
    if (!explanation) {
        return null;
    }

    return (
        <div className="explanation-card">

            <div className="card-header">

                <div>
                    <p className="result-label">
                        AI EXPLANATION
                    </p>

                    <h2>
                        Why was this prediction made?
                    </h2>
                </div>

            </div>


            <div className="explanation-summary">
                <p>
                    {explanation.summary}
                </p>
            </div>


            {explanation.factors &&
                explanation.factors.length > 0 && (

                    <div className="factors-section">

                        <h3>
                            Important Factors
                        </h3>


                        <div className="factor-list">

                            {explanation.factors.map(
                                (factor, index) => (
                                    <div
                                        className="factor-item"
                                        key={index}
                                    >
                                        <span className="factor-number">
                                            {index + 1}
                                        </span>

                                        <span>
                                            {factor}
                                        </span>
                                    </div>
                                )
                            )}

                        </div>

                    </div>
                )}

        </div>
    );
}


export default ExplanationCard;