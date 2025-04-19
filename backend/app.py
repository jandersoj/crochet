from flask import Flask, jsonify, request, send_from_directory, session
from flask_cors import CORS
from flask_session import Session
import redis
import os

# Initialize Flask app
app = Flask(__name__, static_folder='dist', static_url_path='')

# Redis session configuration
app.config['SESSION_REDIS'] = redis.StrictRedis.from_url(
    os.environ.get('REDIS_URL', 'redis://localhost:6379/0')
)
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'chart_data:'

# Secret key for session encryption
#remember to run 
app.secret_key = os.environ.get('SECRET_KEY', 'e88fa07e2dc8029cd3508b14917104d2cdb9f3bb9805d50ee66d72d1f82b9c7b')

# Initialize Flask-Session
Session(app)

# Enable CORS
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "https://circldelic.art/"]}}, supports_credentials=True)

@app.route('/')
@app.route('/<path:path>')
def serve(path='index.html'):
    return send_from_directory(app.static_folder, path)

def get_chart_data():
    return session.get('chart_data', [])

def set_chart_data(data):
    session['chart_data'] = data
    session.modified = True

def add_chart_data(data):
    chart_data = get_chart_data()
    chart_data.append(data)
    set_chart_data(chart_data)

def change_stitch(round_index, stitch_index, new_stitch):
    chart_data = get_chart_data()
    try:
        stitches = chart_data[round_index].get("stitches")
        stitches[stitch_index] = new_stitch
        set_chart_data(chart_data)
    except (IndexError, AttributeError, TypeError):
        print("Invalid data structure access")

@app.route('/update-stitch', methods=['POST'])
def update_stitch():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided"})

    round_index = data.get("roundIndex")
    stitch_index = data.get("stitchIndex")
    new_stitch = data.get("newStitch")

    if new_stitch is None or round_index is None or stitch_index is None:
        return jsonify({"error": "Missing required fields"})

    change_stitch(round_index, stitch_index, new_stitch)
    return jsonify(get_chart_data())

@app.route('/submit-sequence', methods=['POST'])
def submit_sequence():
    data = request.get_json()
    add_chart_data(data)
    return jsonify(data)

@app.route('/get-chart-data', methods=['GET'])
def fetch_chart_data():
    return jsonify(get_chart_data())

@app.route("/clear-chart", methods=["POST"])
def clear_chart():
    set_chart_data([])
    return jsonify([])

@app.route('/hello-world', methods=["GET"])
def hello_world():
    return "hello world"

if __name__ == '__main__':
    app.run()

r = redis.StrictRedis.from_url('redis://localhost:6379/0')
print(r.ping())  # Should print True if Redis is running
