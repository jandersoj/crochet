from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS 
import json

app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app)

# Initialize chart_data as a list
chart_data = []
# and rounds, so that we can count indices more easily
chart_indices = 0; 

@app.route('/')
@app.route('/<path:path>')
def serve(path='index.html'):
    return send_from_directory(app.static_folder, path)

def add_chart_data(data):
    global chart_indices
    print("Adding data...")
    print(data, "\n\n")  # Print the data being added
    chart_data.append(data)
    print("Current chart_data:", chart_data, "\n")
    # chart_indices += 1

@app.route('/submit-sequence', methods=['POST'])
def submit_sequence():
    data = request.get_json()
    print("Received data:", data)  # Print the received data
    add_chart_data(data)  # Directly pass the data to add_chart_data
    return jsonify(data)

@app.route('/get-chart-data', methods=['GET'])
def get_chart_data():
    return jsonify(chart_data)

@app.route("/clear-chart", methods=["POST"])
def clear_chart():
    chart_data.clear()
    chart_rounds = 0;
    return jsonify(chart_data)

# implement undo and redo

@app.route('/hello-world', methods=["GET"])
def hello_world():
    return "hello world"

if __name__ == '__main__':
    app.run(debug=True)
