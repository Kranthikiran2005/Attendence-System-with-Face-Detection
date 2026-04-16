const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");


const SECRET = "daredevils";



const app = express();

const db = require('./db');

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));
app.get('/', async (req, res) => {
  console.log("Hi");
  
});

app.post("/login", async (req, res) => {
  try {
    const { loginId, loginPassword, role } = req.body;

    if (!loginId || !loginPassword || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const id = loginId;
    const password = loginPassword;

    let sql = "";

    if (role === "student") {
      sql = "SELECT S_ID, password, S_Name FROM student WHERE S_ID=?";
    } else {
      sql = "SELECT T_ID, T_NAME, password FROM teacher WHERE T_ID=?";
    }

    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❗ Plain check (replace with bcrypt ideally)
    if (rows[0].password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: id },
      SECRET,
      { expiresIn: "1h" }
    );

    if (role === "student") {
      res.json({
        token,
        user_name: rows[0].S_Name,
        id: rows[0].S_ID
      });
    } else {
      res.json({
        token,
        user_name: rows[0].T_NAME
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, section, user_id, pwd, role } = req.body;

    console.log(user_id, pwd, role);

    if (role === "Student") {
      console.log("Hi1");
      const sql = "INSERT INTO student (S_ID, S_Name, Sec, password) VALUES (?, ?, ?, ?)";
      
      await db.query(sql, [user_id, name, section, pwd]);

      return res.status(201).json({ message: "User registered successfully" });
    }
    else if(role === "Teacher"){
      console.log(role);
      const sql="INSERT INTO teacher (T_ID,T_Name,password) VALUES (?,?,?)";

      await db.query(sql,[user_id,name,pwd]);
      return res.status(201).json({ message: "User registered successfully" });
    }
    console.log("Hi2");
    return res.status(400).json({ message: "Invalid role" });
    
  } catch (err) {
    console.log(err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: "User already exists" });
    }

    return res.status(500).json({ message: "Database error" });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});