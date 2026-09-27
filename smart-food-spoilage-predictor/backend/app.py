from flask import Flask, jsonify
from flask_cors import CORS

from routes.prediction import prediction_bp


# --------------------------------------------------
# Create Flask application
# --------------------------------------------------

app = Flask(__name__)

# Allow frontend to communicate with backend
CORS(app)


# --------------------------------------------------
# Register routes
# --------------------------------------------------

app.register_blueprint(
    prediction_bp,
    url_prefix="/api",
)


# --------------------------------------------------
# Health check
# --------------------------------------------------

@app.route("/", methods=["GET"])
def home():

    return jsonify(
        {
            "success": True,
            "message": "Smart Food Spoilage Predictor API is running!",
        }
    )


# --------------------------------------------------
# Run server
# --------------------------------------------------

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True,
    )