const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");


const SECRET = "daredevils";



const app = express();

const db = require('./db');
app.use(cors({
    origin: "http://localhost:3001 ",
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



app.get('/', async (req, res) => {
  console.log("Hi");
  
});
const { spawn } = require('child_process');
const path = require('path');


const verifyToken= (req,res,next) => {
  const bearer= req.headers["authorization"];

  if(!bearer){
    res.status(403).json({message: "No token provided"});
  }
  const token=bearer.split(" ")[1];

  jwt.verify(token,SECRET,(err,decoded)=>{
    if(err){
      return res.status(403).json({message: "Invalid token"});
    }
    req.user=decoded;
    next();
  });

};



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
    const isMatch=await bcrypt.compare(password,rows[0].password);


    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: id, role: role },
      SECRET,
      { expiresIn: "1h" }
    );
    console.log(rows[0].S_Name)

    if (role === "student") {
      return res.json({
        token,
        user_name: rows[0].S_Name,
        id: id
      });
    } else {
      return res.json({
        token,
        user_name: rows[0].T_NAME,
        id: id
      });
    }

    return res.status(200).json({message : "Success", userId:id, name:rows[0].name})

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, section, user_id, pwd, role } = req.body;

    const hashedPassword=await bcrypt.hash(pwd,8);




    if (role === "Student") {
      console.log("Hi1");
      const sql = "INSERT INTO student (S_ID, S_Name, Sec, password) VALUES (?, ?, ?, ?)";
      
      await db.query(sql, [user_id, name, section, hashedPassword]);

      return res.status(201).json({ message: "User registered successfully" });
    }
    else if(role === "Teacher"){
      console.log(role);
      const sql="INSERT INTO teacher (T_ID,T_Name,password) VALUES (?,?,?)";

      await db.query(sql,[user_id,name,hashedPassword]);
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
app.get("/student/subjects",verifyToken,async (req,res)=>{
    const studentId = req.user.userId;

    const [rows]=await db.query("SELECT Sec FROM student WHERE S_ID=?",[studentId]);
    //console.log(rows);
    const section=rows[0].Sec;
    //console.log(section);
    const [subjects]=await db.query("SELECT Subject,Section FROM subject WHERE Section=?",[section]);
    //console.log(subjects);

    return res.json(subjects);
});

app.post("/student/attendance",verifyToken,async(req,res)=>{
  const studentId = req.user.userId;

  console.log("Hi");
  const subject=req.body.subject;
  console.log(subject);

  const [rows]=await db.query("SELECT no_of_present,no_of_classes FROM attendance WHERE S_ID=? AND Sub=?",[studentId,subject]);
  console.log(rows);
  return res.json(rows);

});
app.get("/teacher/subjects", verifyToken, async (req, res) => {
  try {
    const teacherId = req.user.userId;
    

    // Optional: check if already exists
    const [existing] = await db.query(
      "SELECT Subject,Section FROM subject WHERE T_ID=?",
      [teacherId]
    );

    if (existing.length > 0) {
      //console.log("Subjects are available");
    }


    return res.json(existing);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error finding subject" });
  }
});


app.post("/teacher/add-subject",verifyToken, async (req, res) => {
  try {
    

    const teacherId = req.user.userId;
    const { subject, section } = req.body;

    if (!subject || !section) {
      return res.status(400).json({ error: "All fields required" });
    }
    const [rows]=await db.query("SELECT S_ID FROM student WHERE Sec=?",[section]);
    console.log(rows);
    await db.query(
      "INSERT INTO subject (Subject, Section, T_ID) VALUES (?, ?, ?)",
      [subject, section,teacherId]
    );
    if(rows.length>0){
      for(student of rows){
        await db.query("INSERT INTO attendance (S_ID,T_ID,Sub,Section) VALUES(?,?,?,?)",[student.S_ID,teacherId,subject,section]);
      } 
    }
    

    res.json({ message: "Subject added" });
  } catch (err) {
    console.error(err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        error: "Subject already registered for this section",
      });
    }
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/students/:subject/:section",verifyToken,async(req,res)=>{
  try{
    const teacherId = req.user.userId;
    const subject=req.params.subject;
    const section=req.params.section;
    console.log(subject);
    console.log(section);

    const [students]=await db.query("SELECT A.S_ID, A.S_Name,B.no_of_present FROM student A JOIN attendance B ON A.S_ID=B.S_ID WHERE B.Sub=? AND B.T_ID=? AND A.Sec=?",[subject,teacherId,section]);
    
    if(students.length==0){
      console.log("No Students");
    }
    console.log(students);
    return res.json(students);

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/students/course/delete/:subject/:section",verifyToken,async(req,res)=>{
  try{
    const teacherId = 555;
    const subject=req.params.subject;
    const section=req.params.section;
    console.log(subject);
    console.log(section);

    
    await db.query("DELETE FROM subject WHERE Subject=? AND Section=? AND T_ID=?",[subject,section,teacherId]);

    const [rows]=await db.query("SELECT S_ID FROM student WHERE Sec=?",[section]);

    if(rows.length>0){
      for(student of rows){
        await db.query("DELETE FROM attendance WHERE S_ID=? AND T_ID=? AND Sub=?",[student.S_ID,teacherId,subject]);
      } 
    }
    

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/attendance/enroll",verifyToken, async (req, res) => {
  const student_id=req.user.userId;
  const { image} = req.body;
  
  try {
    const base64Data = image.replace(/^data:image\/png;base64,/, "");

    // call python API
    const response = await fetch("http://localhost:5000/embed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Data }),
    });

    const data = await response.json();

    const embedding = data.embedding;

    const [rows]=await db.query("SELECT * FROM embeddings WHERE S_ID=?",student_id);
    // store in DB
    if(rows.length > 0){
      await db.query("UPDATE embeddings SET embeddings=? WHERE S_ID=?",[JSON.stringify(embedding),student_id]);
    }
    else{
      await db.query(
      "INSERT INTO embeddings (S_ID, embeddings) VALUES (?, ?)",
      [student_id, JSON.stringify(embedding)]
    );
    }
    await fetch("http://localhost:5000/refreshEmbeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    
    console.log("Embeddings added to database");

    res.json({ message: "Embedding stored" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed" });
  }
});
app.post("/attendance/match",verifyToken, async (req, res) => {
  const T_ID=req.user.userId;
 
  const { image,subject,section } = req.body;

  try {
    // 🔹 Step 1: Clean base64
    const base64Data = image.split(',')[1];
    console.log(base64Data)
    // 🔹 Step 2: Get embedding from Flask
    const embedRes = await fetch("http://localhost:5000/embed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Data }),
    });

    const embedData = await embedRes.json();
    const embedding = embedData.embedding;

    // 🔹 Step 3: Send embedding to match API
    const matchRes = await fetch("http://localhost:5000/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_embedding: embedding }),
    });
    
    const matchData = await matchRes.json();
    await db.query ("UPDATE attendance SET no_of_present=no_of_present+1 WHERE S_ID=? AND T_ID = ? AND Section = ? AND Sub = ?",
      [matchData.student_id,T_ID,section,subject]
    );
    // 🔹 Step 4: Return result
    res.json({
      student_id: matchData.student_id,
      score: matchData.score,
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Matching failed" });
  }
});
app.post("/teacher/attendance",verifyToken,async(req,res)=>{
  const T_ID = req.user.userId;
  const { section, subject } = req.body;
  console.log("Sahil san")
  try {
     await db.query(
      `UPDATE attendance 
       SET no_of_classes = no_of_classes + 1 
       WHERE T_ID = ? AND Section = ? AND Sub = ?`,
      [T_ID, section, subject]
    );

    res.json({ message: "Class count updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
})



app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  
});