const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const route = require("./Route/route");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();

app.use("/", route);
const port = process.env.port || 9000;
app.listen(port, (err) => {
  if (err) {
    console.log(`Error detected on port : ${port}`);
  } else {
    console.log(`Connection Success on port : ${port}`);
  }
});

/*
const path = require('path');
const express=require('express');
const app=express();
const route=require('./Route/route');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(bodyParser.json());

let dotenv=require('dotenv');
dotenv.config();
const port=process.env.port || 8000;

const static_path =path.join(__dirname,'/views')
app.use(express.static(static_path));
app.set('view engine','hbs');
//app.use(express.static(path.join(__dirname, '/views')));


// app.use(express.json());
// app.use(express.urlencoded({extended: false }))
app.use('/',route,(req,res)=>{
    res.render('RegistrationForm')}
    );

setInterval( async () => {
   try {
    let connect = await tokencollection();
    let res =await connect.deleteOne({'status':false});
    if(res.deletedCount >= 1){
        console.log('deleted invalid token');
           }else{
            console.log("Empty for removed data");
           }
    
   } catch (error) {
    console.log(error);
   }
  }, 3600000);
*/
