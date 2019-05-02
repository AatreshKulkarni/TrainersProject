const express = require("express");
const mysql = require('mysql');
const bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.json());

// Connecting MySQL
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1js13cs002",
    database:"trainersdb"
});

con.connect((err) => {
    if(err) throw err;
    console.log("Connected!");
});

app.listen(3000,(err)=>{
    if(err)
    throw error;
    console.log("Express server  is running at port: 3000")
});

// Get All Trainers
app.get('/trainers', (req,res) => {
    con.query("SELECT * FROM trainers",(err,rows,fields)=>{
        if(err) throw err;
        res.send(rows);
    })
});

// Get A Trainer
app.get('/trainers/:id',(req,res) => {
    con.query("SELECT * FROM trainers WHERE TrainerID = ?", [req.params.id], (err,rows,fields)=> {
        if(err) throw err;
        res.send(rows);
    });
});

// Delete a Trainer
app.delete('/trainers/:id',(req,res) => {
    con.query("DELETE FROM trainers WHERE TrainerID = ?",[req.params.id],(err,rows,fields) => {
        if(err) throw err;
        res.send("Deleted Successfully");
    });
});

// Create a Trainer
app.post('/trainers',(req,res) => {
    let trainer = req.body;
    let post = {Name:trainer.Name,SkillSet:trainer.SkillSet,Experience: trainer.Experience,ContactNumber:trainer.ContactNumber}
    let sql = "INSERT INTO trainers SET ?"
    con.query(sql,post,(err,rows,fields)=>{
        if(err) throw err;
        res.send("Inserted record with insertID: " + rows.insertId);
    });
});


// Update a Trainer
app.put('/trainers/:id',(req,res) => {
    let trainer = req.body;
    let put = {Name:trainer.Name,SkillSet:trainer.SkillSet,Experience: trainer.Experience,ContactNumber:trainer.ContactNumber}
    let sql = "UPDATE trainers SET ? WHERE TrainerId =" + req.params.id;
    con.query(sql,put,(err,rows,fields)=>{
        if(err) throw err;
        res.send("Updated record ");
        console.log(rows);
    });
})