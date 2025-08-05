from flask import Flask, request, jsonify, render_template
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests if needed (especially for testing)

# Load your trained model
model = joblib.load("crop_model.pkl")

# Home route – serve the form from templates/index.html
@app.route('/')
def home():
    return render_template("index.html")

# Predict route – receive POST request from frontend JS
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data)

        if not data:
            return jsonify({"error": "No input data received"}), 400

        # Extract and order features
        features = [
            data.get('N'),
            data.get('P'),
            data.get('K'),
            data.get('temperature'),
            data.get('humidity'),
            data.get('ph'),
            data.get('rainfall')
        ]

        prediction = model.predict([features])[0]
        return jsonify({"recommended_crop": prediction})
    
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500

# Run the Flask server
if __name__ == "__main__":
    app.run(debug=True)
