# face_utils.py

from deepface import DeepFace
import numpy as np
import json
import struct
import mysql.connector
from dotenv import load_dotenv
import os

print("PASSWORD:", os.getenv("DB_PASSWORD"))

load_dotenv()

MODEL_NAME = "Facenet"
THRESHOLD = 0


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

def SQltoEmbeddings() :
    

    connection = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
    )

    cursor = connection.cursor()
    cursor.execute("SELECT S_ID, embeddings FROM embeddings")

    rows = cursor.fetchall()

    #for row in rows:
    #   print(row)
    
    stored_embeddings=[]

    for student_id, emb in rows:
        if emb is None:
            print("None")
            continue

        if isinstance(emb, bytes):
            emb_str = emb.decode('utf-8')

        emb_list = json.loads(emb_str)

        stored_embeddings.append((student_id, emb_list))

    cursor.close()
    connection.close()
    print("Embeddigns:",stored_embeddings)
    return stored_embeddings

def serialize_embedding(embedding):
    return json.dumps(embedding)



def deserialize_embedding(embedding_str):
    return json.loads(embedding_str)



def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))



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