
const express = require("express");
const path = require('path');
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
const PORT = process.env.PORT || 6060;
const __dirname1=path.resolve();
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname1,"../FrontEnd/build")));
  app.use('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"..","FrontEnd","build","index.html"));
  });
  app.use("/", route);
}else{
app.get('/',(req,res)=>{
  res.send(`Server Is Succesfully Running On PORT ${PORT}`);
});
app.use("/", route);
}

app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error detected on port : ${PORT}`);
  } else {
    console.log(`Connection Success on port : ${PORT}`);
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
