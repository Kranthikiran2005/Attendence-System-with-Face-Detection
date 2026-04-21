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
```

project/
│
├── frontend/                # React frontend
│   ├── pages/              # All implemented pages
│   └── App.js
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── database/           
│   │   └── schema.sql      
│   │
│   ├── face_backend/       # Flask + Face Recognition
│   │   ├── app.py
│   │   ├── face_utils_3.py
│   │   └── test.py
│
└── README.md
```
## ⚙️ Installation & Setup

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/Kranthikiran2005/Attendence-System-with-Face-Detection.git
cd Attendence-System-with-Face-Detection
```

### Frontend Setup (React)
```
cd frontend
npm install
npm install jspdf jspdf-autotable
npm start
```
### 🖥️ Backend Setup (Node.js - Express)
```
cd backend

Required Node Packages:

npm install express cors bcryptjs jsonwebtoken cookie-parser mysql2

npm install

To Run:
node server.js/npm start
```




### 🧠 Face Recognition Backend Flask API Setup:
```
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
```

## 🗄️ Database Setup

Follow these steps to set up MySQL for the project.

---

### 1️⃣ Install MySQL

Download and install MySQL Server:  
https://dev.mysql.com/downloads/mysql/

---

### 2️⃣ Create Database

Open MySQL and run:

```sql
CREATE DATABASE attendance_db;
```

### 3️⃣ Import Database Schema
```
mysql -u root -p attendance_db < database/schema.sql
```

### 4️⃣ Configure Database Credentials

Go to:

backend/

Create a .env file and add:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=attendance_db


## How to run:
```
1) cd backend/face_backend
    venv\Scripts\activate
    python app.py
2) cd backend
    npm start
3) cd frontend
   npm start
```

## How It Works
First register few Students

Register a teacher

All **Teacher and Student** should be registed from register button in Homepage using role option **(should use their own ID)**

Please be careful while while switching from student page to teacher page or teacher to student,

Do logout from teacher if you wish to switch to student and vice-versa

**Student Interface:**
login to student with id, password.

click on take photos option and add a photo of student.

**Teacher Interface:**
Teacher can add subjects for a section.

When teacher adds subject for a section, that combination of subject-section cannot be taken by other teacher

Teacher selects a section-subject from their page.


Start Attendance -> Camera starts

Image is captured manually

Image is sent to backend

Face embedding is generated 

Compared with stored embeddings

Attendance is marked (can check in console for verification)

Attencdance of students present in class is logged on the screen.

## 🏗️ Tech Stack
Frontend

React.js

React Router

HTML, CSS

Backend

Node.js (Express.js)

Flask (for face recognition processing)

Database MySQL

OpenCV

NumPy

DEEPFACE/ Embedding model

jsPDF (for PDF generation)

### 📄 Attendance Report
Generates PDF with:

Student ID

Name

Present count

Absent count


