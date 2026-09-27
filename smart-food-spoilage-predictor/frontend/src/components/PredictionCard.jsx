function PredictionCard({ prediction, foodData }) {
    if (!prediction) {
        return null;
    }

    const remainingDays =
        prediction.remaining_shelf_life_days ?? 0;

    return (
        <div className="prediction-card">

            <div className="prediction-card-header">
                <div>
                    <p className="result-label">
                        SHELF-LIFE ESTIMATE
                    </p>

                    <h2>
                        Remaining Usable Time
                    </h2>
                </div>
            </div>


            <div className="shelf-life-display">

                <span className="shelf-life-number">
                    {remainingDays}
                </span>

                <span className="shelf-life-unit">
                    days
                </span>

            </div>


            <p className="shelf-life-note">
                Estimated remaining shelf life based
                on the current food and storage
                conditions.
            </p>


            {foodData && (
                <div className="prediction-details">

                    <div className="detail-item">
                        <span>
                            Food
                        </span>

                        <strong>
                            {foodData.food_type}
                        </strong>
                    </div>


                    <div className="detail-item">
                        <span>
                            Temperature
                        </span>

                        <strong>
                            {foodData.temperature_c}°C
                        </strong>
                    </div>


                    <div className="detail-item">
                        <span>
                            Humidity
                        </span>

                        <strong>
                            {foodData.humidity_percent}%
                        </strong>
                    </div>


                    <div className="detail-item">
                        <span>
                            Packaging
                        </span>

                        <strong>
                            {foodData.packaging_material}
                        </strong>
                    </div>


                    <div className="detail-item">
                        <span>
                            Storage
                        </span>

                        <strong>
                            {foodData.storage_condition}
                        </strong>
                    </div>

                </div>
            )}

        </div>
    );
}


export default PredictionCard;