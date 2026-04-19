# face_utils.py

from deepface import DeepFace
import numpy as np
import json

MODEL_NAME = "Facenet"
THRESHOLD = 0.7


# 🔹 Generate embedding from image path
def generate_embedding(image_path):
    try:
        result = DeepFace.represent(
            img_path=image_path,
            model_name=MODEL_NAME,
            enforce_detection=True
        )
        return result[0]["embedding"]
    except Exception as e:
        print("Error generating embedding:", e)
        return None


# 🔹 Convert embedding to storable format
def serialize_embedding(embedding):
    return json.dumps(embedding)


# 🔹 Convert back from DB
def deserialize_embedding(embedding_str):
    return json.loads(embedding_str)


# 🔹 Cosine similarity
def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


# 🔹 Match function
def find_match(input_embedding, stored_embeddings):
    """
    stored_embeddings: list of (student_id, embedding_list)
    """
    best_match = None
    best_score = -1

    for student_id, emb in stored_embeddings:
        score = cosine_similarity(input_embedding, emb)

        if score > best_score:
            best_score = score
            best_match = student_id

    if best_score > THRESHOLD:
        return best_match, best_score
    else:
        return None, best_score