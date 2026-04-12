const express=require("express");

const router=express.Router();

const db = require('./db');

router.get("/",async (req,res)=>{

    const result =await db.query(
        'SELECT st.T_ID FROM student_table s JOIN subject_table st ON s.Sec = st.Section WHERE s.S_ID = ? AND st.Subject = ?;')
    res.send(result)
})

router.post("")