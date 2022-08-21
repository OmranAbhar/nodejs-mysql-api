const express=require('express');
const app=express();
const mysql=require('mysql');
const bodyParser=require('body-parser');
// const cors=require("cors");
// app.use(cors);
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

 const db=mysql.createPool({
	host:'localhost',
    port:780,
	user:'root',
	password:'',
	database:'notejsdb',
 });

app.get('/',(req,res)=>{
	res.send("hellow world");
});

app.get("/api/getUser",(req,res)=>{
	const obQuery="SELECT * FROM `user`;";
	db.query(obQuery,(err,result)=>{
		res.send(result);
	});
 });

 app.post("/api/insertUser",(req,res)=>{
	const name=req.body.name;
	const email=req.body.email;
	const password=req.body.password;

	const obQuery="INSERT INTO `user` ( `name`, `email`, `password`) VALUES (?, ?,?);";
	db.query(obQuery,[name,email,password],(err,result)=>{
		res.send("Insert Record");
	});
 });
 
 app.post("/api/UpdateUser",(req,res)=>{
	const id=req.body.id;
	const name=req.body.name;
	const email=req.body.email;
	const password=req.body.password;

	const obQuery="UPDATE `user` SET `name` = ?, `email` = ?, `password` = ? WHERE `user`.`id` = ?;";
	db.query(obQuery,[name,email,password,id],(err,result)=>{
		res.send("Update Record", result);
	});
 });

 app.post("/api/deleteUser",(req,res)=>{
	const id=req.body.id;
	const obQuery="DELETE FROM `user` WHERE `user`.`id` = ?;";
	db.query(obQuery,[id],(err,result)=>{
		res.send("deleteRecord");
	});
 });

app.listen(3001,()=>{
	console.log("running on port 3001");
})