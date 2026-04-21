# 🎓 Face Recognition Attendance Management System

A Face Recognition-based Attendance Management System that automates student attendance using a webcam.  
It captures images, processes them using facial embeddings, and marks attendance by comparing with stored data.

This system eliminates manual attendance, reduces proxy attendance, and ensures accuracy.

---

## 🚀 Features

- 🎥 Real-time camera access  
- 📸 Manual image capture  
- 🧠 Face recognition using embeddings  
- 🧑‍🎓 Student identification  
- 📊 Attendance tracking (Present / Absent)  
- 📄 PDF report generation  
- 👨‍🏫 Teacher & Student login system  
- 🏫 Section-based attendance management  

---

## 📁 Project Structure

project/
│
├── frontend/ # React frontend
│ ├── pages/ # All implemented pages
│ └── App.js
│
├── backend/
│ ├── server.js
│ ├── db.js
│ ├── face_backend/ # Flask + Face Recognition
│ │ ├── app.py
│ │ ├── face_utils_3.py
│ │ └── test.py
│
└── README.md

## ⚙️ Installation & Setup

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/your-username/attendance-system.git
cd attendance-system


### Frontend Setup (React)
cd frontend
npm install
npm install jspdf jspdf-autotable
npm start

### 🖥️ Backend Setup (Node.js - Express)
cd backend

Required Node Packages:
```bash
npm install express cors bcryptjs jsonwebtoken cookie-parser mysql2

npm install

To Run:
node server.js/npm start





🧠 Face Recognition Backend Flask API Setup:

cd backend/face_backend

# Create virtual environment
python -m venv venv  

# Activate environment
# Windows
venv\Scripts\activate  

# Mac/Linux
source venv/bin/activate  

# Install dependencies
pip install deepface opencv-python numpy flask mysql-connector-python tf-keras

# Run Flask server
python app.py


How to run:
1) cd backend/face_backend
    venv\Scripts\activate
    python app.py
2) cd backend
    npm start
3) 


📸 How It Works
Teacher selects a section
Camera starts
Image is captured manually
Image is sent to backend
Face embedding is generated
Compared with stored embeddings
Attendance is marked

🏗️ Tech Stack
Frontend
React.js
React Router
HTML, CSS
Backend
Node.js (Express.js)
Flask (for face recognition processing)
Database
MySQL
Other Tools / Libraries
OpenCV
NumPy
Face Recognition / Embedding model
jsPDF (for PDF generation)

📄 Attendance Report
Generates PDF with:
Student ID
Name
Present count
Absent count


