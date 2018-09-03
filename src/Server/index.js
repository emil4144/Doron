require('dotenv').config();
const mysql=require("mysql");
const Fakerator=require("fakerator");
const fakerator=Fakerator();
const express=require("express");
const path=require("path");
const app=express();
const table="stats";



const dir = __dirname.replace("Server","");
console.log(dir)
app.use(express.static(path.join(dir,"dist/doronfront")));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database : process.env.DB,
});


con.connect((err)=>{
  if (err) throw err;
  console.log("Connected!");
});


app.get('/database',(req,res)=>{
	 con.query("CREATE DATABASE IF NOT EXISTS Doron", (err, result)=> {
	    if (err) throw err;	 	     
	  });
	 let q=`CREATE TABLE IF NOT EXISTS  ${table} (
	 	ID int NOT NULL   AUTO_INCREMENT,
	 	Name VARCHAR(50),
	 	Email VARCHAR(50),
	 	Instagram VARCHAR(50),
	 	Facebook VARCHAR(50),
	 	Twitter VARCHAR(50),
	 	Blog VARCHAR(50),
	 	Youtube VARCHAR(50),
	 	Pinterest VARCHAR(50),
	 	Location VARCHAR(50),
	 	PRIMARY KEY (ID))`;
	 con.query(q,(err,result)=>{
	 	if (err) throw err;	 	
	 })
	res.json("complete")
});





app.get('/addindb',(req,res)=>{
	var dlength=12;
let q=`INSERT INTO ${table} (Name, Email, Instagram, Facebook, Twitter, Blog, Youtube, Pinterest, Location)VALUES("${fakerator.names.name()}", "${fakerator.internet.email()}", ${fakerator.random.number(10000, 1000000)}, ${fakerator.random.number(10000, 1000000)}, ${fakerator.random.number(10000, 1000000)}, ${fakerator.random.number(10000, 1000000)}, ${fakerator.random.number(10000, 1000000)}, ${fakerator.random.number(10000, 1000000)}, "${fakerator.address.country()}")`;
for(let i=0; i<dlength; i++){
	con.query(q, (err,data)=>{
	if (err) throw err;
	
})
	}
res.json("complete")

})





app.post("/getdata", (req, res)=>{
	
		if(parseInt(req.body.id)!=req.body.id){
	

			con.query(`SELECT COUNT(*) AS TOTAL FROM ${table} WHERE  (Name LIKE "${req.body.id}%"
				OR Email LIKE "${req.body.id}%" )
			 	AND Instagram Like "${req.body.instagram}%"
			   	AND Facebook Like "${req.body.facebook}%"
			    AND Blog Like "${req.body.blog}%"
			    AND Twitter Like "${req.body.twitter}%"
			    AND Youtube Like "${req.body.youtube}%"
			    AND Pinterest Like "${req.body.pinterest}%"`,(err, total)=>{
			    	
			    	let first=parseInt(req.body.nid)*10-10;
					con.query(`SELECT * FROM ${table} WHERE (Name LIKE "${req.body.id}%" 	OR Email LIKE "${req.body.id}%") 
					 	AND Instagram LIKE "${req.body.instagram}%"
					   	AND Facebook Like "${req.body.facebook}%"
					    AND Blog Like "${req.body.blog}%"
					    AND Twitter Like "${req.body.twitter}%"
					    AND Youtube Like "${req.body.youtube}%"
					    AND Pinterest Like "${req.body.pinterest}%"
					    ORDER BY ${req.body.sortcol} ${req.body.srttype} 
					    LIMIT ${first}, 10`, (err, data)=>{
					if (err) throw err;	
					let dat={
						Quantity:total,
						tdata:data
					};	
					console.log(dat)
					res.json({dat})
				})
			})
		}
		else{
			let first=parseInt(req.body.nid)*10-10;
			con.query(`SELECT COUNT(*) AS TOTAL FROM ${table} WHERE  ID LIKE "${req.body.id}%" 
				AND Instagram Like "${req.body.instagram}%"
				AND Facebook Like "${req.body.facebook}%"
				AND Blog Like "${req.body.blog}%"
				AND Twitter Like "${req.body.twitter}%"
				AND Youtube Like "${req.body.youtube}%"
				AND Pinterest Like "${req.body.pinterest}%"`, (err, total)=>{
				con.query(`SELECT * FROM ${table} WHERE  ID LIKE "${req.body.id}%" 
					AND Instagram Like "${req.body.instagram}%"
					AND Facebook Like "${req.body.facebook}%"
					AND Blog Like "${req.body.blog}%"
					AND Twitter Like "${req.body.twitter}%"
					AND Youtube Like "${req.body.youtube}%"
					AND Pinterest Like "${req.body.pinterest}%"
					ORDER BY ${req.body.sortcol} ${req.body.srttype} 
					LIMIT ${first}, 10`, (err, data)=>{
					if (err) throw err;
						
					let dat={
						Quantity:total,
						tdata:data
					};	
					res.json({dat})
				})

			})
		}
	
})


	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../dist/doronfront/index.html'));
  
  });
app.listen(process.env.PORT);