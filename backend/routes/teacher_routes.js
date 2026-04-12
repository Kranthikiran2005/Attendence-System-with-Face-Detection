const express=require("express");

const router=express.Router();

const db = require('./db');

router.put('/start',async (req,res)=>{

    const sname=req.body.section_name;
    const teacher_id=req.body.t_id;
    const [rows]= await db.query(
        'UPDATE TABLE section_table SET status=1 where section=sname AND T_ID=teacher_id');

    
})

router.put('/end',async (req,res)=>{

    const sname=req.body.section_name;
    const teacher_id=req.body.t_id;
    const [rows]= await db.query(
        'UPDATE TABLE section_table SET status=0 where section=sname AND T_ID=teacher_id');
    
})