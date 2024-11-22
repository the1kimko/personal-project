from flask import Flask, request, jsonify, json
import os
import requests
import random
import string
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
    

@app.route('/register-ipn-url', methods=['POST'])
def register_ipn():
    ipn_url = f"{PESAPAL_BASE_URL}/api/URLSetup/RegisterIPN"
    data = request.get_json()
    session_token = data.get("sessionToken")
    redirect_url = "https://spiffy-fenglisu-28e366.netlify.app/"

    ipn_request_payload = {
        "url": redirect_url,
        "ipn_notification_type": "GET"
    }

    
    try:
        headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"Bearer {session_token}"
    }
        response = requests.post(ipn_url, json=ipn_request_payload, headers=headers)
        
        response.raise_for_status()
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    
def generate_random_id(length=12):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))
    
@app.route('/submit-order', methods=['POST'])
def submit_order():
    submit_url = f"{PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest"
    data = request.get_json()
    session_token = data.get("sessionToken")
    ipn_id = data.get("ipnId")
    intAmt = data.get("amount")
    email = data.get("emailCust")
    phone = data.get("phoneCust")
    fname = data.get("fname")
    lname = data.get("lname")

    transaction_id = generate_random_id()
    order_request = {
        "id": transaction_id,
        "currency": "KES",
        "amount": intAmt,
        "description": "Payment for services/products",
        "callback_url": "https://lucent-moxie-7b30b4.netlify.app/",
        "redirect_mode": "",
        "notification_id": ipn_id,
        "branch": "PesaPal API",
        "billing_address": {
            "email_address": email,
            "phone_number": phone,
            "country_code": "KE",
            "first_name": fname,
            "middle_name": "",
            "last_name": lname,
            "line_1": "Pesapal Limited",
            "line_2": "",
            "city": "",
            "state": "",
            "postal_code": "",
            "zip_code": ""
        }
    }
    
    try:
        headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"Bearer {session_token}"
    }
        response = requests.post(submit_url, headers=headers, data=json.dumps(order_request))
        response.raise_for_status()
        result = response.json()
        print("Pespal API response:", result)

        response.raise_for_status()
        return jsonify({
            "merchant_reference": result.get("merchant_reference"),
            "order_tracking_id": result.get("order_tracking_id"),
            "redirect_url": result.get("redirect_url")
        }), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get-payment-status', methods=['GET'])
def get_payment_status():
    order_tracking_id = request.args.get('orderTrackingId')
    status_token = request.headers.get('Authorization')

    status_url = f"{PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId={order_tracking_id}"

    headers = {"Authorization": status_token}
    try:
        response = requests.get(status_url, headers=headers)
        response.raise_for_status()
        result = response.json()
        print(result)

        return jsonify(result), response.status_code
    
    except requests.exceptions.RequestException as e:
        print("error: ", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
    # import os
    # # Use the PORT environment variable, with a fallback to 5000
    # port = int(os.environ.get("PORT", 5000))  
    # app.run(host="0.0.0.0", port=port, debug=True)
