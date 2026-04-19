from flask import Flask, request, jsonify
import base64
import cv2
import numpy as np
from face_utils import generate_embedding, find_match

app = Flask(__name__)

@app.route("/embed", methods=["POST"])
def embed():
    data = request.json
    image_base64 = data["image"]

    # decode image
    image_data = base64.b64decode(image_base64)
    np_arr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    cv2.imwrite("temp.jpg", img)

    embedding = generate_embedding("temp.jpg")

    if embedding is None:
        return jsonify({"error": "No face detected"}), 400

    return jsonify({"embedding": embedding})


@app.route("/match", methods=["POST"])
def match():
    data = request.json
    input_embedding = data["input_embedding"]
    stored_embeddings = data["stored_embeddings"]

    student_id, score = find_match(input_embedding, stored_embeddings)

    return jsonify({
        "student_id": student_id,
        "score": score
    })


if __name__ == "__main__":
    app.run(port=5000, debug=True)