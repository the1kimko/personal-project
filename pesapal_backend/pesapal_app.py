from flask import Flask, request, jsonify
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

PESAPAL_CONSUMER_KEY = os.getenv("PESAPAL_CONSUMER_KEY")
PESAPAL_CONSUMER_SECRET = os.getenv("PESAPAL_CONSUMER_SECRET")
PESAPAL_BASE_URL = os.getenv("PESAPAL_BASE_URL")

app = Flask(__name__)

@app.route('/get-pesapal-token', methods=['POST'])
def get_pesapal_token():
    token_url = f"{PESAPAL_BASE_URL}/api/Auth/RequestToken"
    auth_tokens = {"consumer_key": PESAPAL_CONSUMER_KEY, "consumer_secret": PESAPAL_CONSUMER_SECRET}
    
    try:
        headers = {"Content-Type": "application/json", "Accept": "application/json"}
        response = requests.post(token_url, json=auth_tokens, headers=headers)
        response.raise_for_status()
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    import os
    # Use the PORT environment variable, with a fallback to 5000
    port = int(os.environ.get("PORT", 5000))  
    app.run(host="0.0.0.0", port=port, debug=True)
