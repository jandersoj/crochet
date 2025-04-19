from flask import Flask, jsonify, request, send_from_directory, session
from flask_cors import CORS
import json
from flask import redirect

app = Flask(__name__, static_folder='dist', static_url_path='')
app.secret_key = '\x82\x94+O\r\\<\xbc\xb4\xa8\x8e\x9e'

CORS(app, supports_credentials=True)

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
    app.run(debug=True)
