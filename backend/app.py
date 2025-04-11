from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS 
import json

app = Flask(__name__, static_folder='dist', static_url_path='')
# CORS(app, resources={r"/*": {"origins": "*"}}) 
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

def change_stitch(round_index, stitch_index, new_stitch):
    print(chart_data)
    round=chart_data[round_index]
    print("round:", round)
    stitches = round.get("stitches")
    print("stitches: ", stitches)
    stitches[stitch_index] = new_stitch


    # chart_data[round_index][stitch_index] = new_stitch


@app.route('/update-stitch', methods=['POST'])
def update_stitch():
    
        # Parse the JSON data from the request
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"})

        print("Received data:", data)

        round_index = data.get("roundIndex")
        stitch_index = data.get("stitchIndex")
        new_stitch = data.get("newStitch")


        if new_stitch is None or round_index is None or stitch_index is None or new_stitch is None:
            return jsonify({"error": "Missing required fields"})

        change_stitch(round_index, stitch_index, new_stitch)

        print("Updated chart_data:", chart_data)
        return jsonify(chart_data)

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
