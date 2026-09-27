function History() {
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
                    Previous food spoilage predictions
                    will appear here.
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
                    Your prediction records will be
                    displayed here once history tracking
                    is enabled.
                </p>

            </section>

        </div>
    );
}


export default History;