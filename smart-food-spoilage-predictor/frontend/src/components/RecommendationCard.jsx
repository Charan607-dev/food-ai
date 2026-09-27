function RecommendationCard({ recommendations }) {
    if (
        !recommendations ||
        recommendations.length === 0
    ) {
        return null;
    }

    return (
        <div className="recommendation-card">

            <div className="card-header">

                <div>
                    <p className="result-label">
                        SMART RECOMMENDATIONS
                    </p>

                    <h2>
                        What can you do?
                    </h2>
                </div>

            </div>


            <div className="recommendation-list">

                {recommendations.map(
                    (recommendation, index) => (
                        <div
                            className="recommendation-item"
                            key={index}
                        >

                            <div className="recommendation-icon">
                                ✓
                            </div>

                            <div className="recommendation-text">
                                {recommendation}
                            </div>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}


export default RecommendationCard;