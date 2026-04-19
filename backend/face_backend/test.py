# test.py

from face_utils import generate_embedding, find_match

# 🔹 Simulate database
database = []

# Enroll student
emb1 = generate_embedding("Student1.jpg")
database.append(("S1", emb1))
print("Embedding for student1:", emb1)

emb2 = generate_embedding("Student2.jpg")
database.append(("S2", emb2))
print("Embedding for student2:",emb2)

# 🔹 Test input
input_emb = generate_embedding("Test.jpg")

student_id, score = find_match(input_emb, database)

if student_id:
    print(f"Matched: {student_id}, Score: {score}")
else:
    print(f"No match, Best Score: {score}")