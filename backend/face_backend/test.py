# test.py

from face_utils_3 import generate_embedding, find_match, SQltoEmbeddings

# 🔹 Simulate database
database = []

# Enroll student
#emb1 = generate_embedding("Student1.jpg")
#database.append(("S1", emb1))
#print("Embedding for student1:", emb1)
#print(len(emb1))

#emb2 = generate_embedding("Student2.jpg")
database=SQltoEmbeddings()

#print(database)

# 🔹 Test input
input_emb = generate_embedding("Test3.jpg")

student_id, score = find_match(input_emb, database)



if student_id:
    print(f"Matched: {student_id}, Score: {score}")
else:
    print(f"No match, Best Score: {score}")