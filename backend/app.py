from flask import Flask, jsonify, send_from_directory, request, make_response
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

# Create Flask app
app = Flask(__name__)
CORS(app)

# MongoDB connection
MONGO_URI = "mongodb+srv://overlayuser:overlay123@cluster0.8cfpfjv.mongodb.net/rtsp_overlay?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client["rtsp_overlay"]
overlays_collection = db["overlays"]

# --------------------
# Routes
# --------------------

@app.route("/")
def home():
    return jsonify({"status": "Backend running"})

@app.route("/test-db")
def test_db():
    try:
        overlays_collection.insert_one({"test": "ok"})
        return jsonify({"message": "MongoDB connected successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve HLS files
@app.route("/hls/<path:filename>")
def serve_hls(filename):
    response = make_response(send_from_directory("hls", filename))
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    return response

# GET all overlays
@app.route("/api/overlays", methods=["GET"])
def get_overlays():
    overlays = []
    for o in overlays_collection.find():
        o["_id"] = str(o["_id"])
        overlays.append(o)
    return jsonify(overlays)

# CREATE overlay
@app.route("/api/overlays", methods=["POST"])
def create_overlay():
    data = request.json
    result = overlays_collection.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return jsonify(data), 201

# UPDATE overlay
@app.route("/api/overlays/<overlay_id>", methods=["PUT"])
def update_overlay(overlay_id):
    data = request.json
    overlays_collection.update_one(
        {"_id": ObjectId(overlay_id)},
        {"$set": data}
    )
    return jsonify({"message": "updated"})

# DELETE overlay
@app.route("/api/overlays/<overlay_id>", methods=["DELETE"])
def delete_overlay(overlay_id):
    overlays_collection.delete_one({"_id": ObjectId(overlay_id)})
    return jsonify({"message": "deleted"})

# --------------------
# Start server
# --------------------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
