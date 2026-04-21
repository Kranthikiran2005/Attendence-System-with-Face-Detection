This project is a Face Recognition-based Attendance Management System that automates student attendance using a webcam. 
It captures images, processes them using facial embeddings, and marks attendance by comparing with stored data.

The system eliminates manual attendance, reduces proxy attendance, and ensures accuracy.


Features
🎥 Real-time camera access
📸 Manual image capture
🧠 Face recognition using embeddings
🧑‍🎓 Student identification
📊 Attendance tracking (Present / Absent)
📄 PDF report generation
👨‍🏫 Teacher & Student login system
🏫 Section-based attendance management



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


Project Structure

project/
│
├── frontend/              # React frontend
│   ├── components/
│   ├── pages/
│   └── App.js
│
├── backend/
│   server.js
|   db.js
│   ├── face_backend/      # Flask + Face recognition
│
├
│
│
└── README.md


Installation & Setup
🔹 1. Clone the Repository

git clone https://github.com/your-username/attendance-system.git
cd attendance-system


Frontend Setup (React)
cd frontend
npm install
npm start

🖥️ Backend Setup (Node.js - Express)
cd backend/node_server
npm install
node server.js/npm start

Required Node Packages:
npm install express cors body-parser mysql2

🧠 Face Recognition Backend (Flask)
cd backend/face_backend
python -m venv venv
venv\Scripts\activate     # Windows
# source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
python app.py




