const controller = {};
const service = require("../../service/service");

//const  jwt_decode=require('jwt-decode');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.post(
  bodyParser.urlencoded({
    extended: false,
  })
);

// registration a new user
controller.registration = async function (req, res) {
  try {
    const data = req.body;
    res.json(await service.createuser(data));
  } catch (error) {
    res.send(error);
  }
};
// login by user
controller.login = async function (req, res) {
  try {
    const data = req.body;
    res.json(await service.loginuser(data));
  } catch (error) {
    res.send(error.name);
  }
};

// create as profesional
controller.profregistration = async function (req, res) {
  try {
    const data = req.body;
    res.json(await service.createprof(data));
  } catch (error) {
    res.send(error.name);
  }
};

// profesional login
controller.proflogin = async function (req, res) {
  try {
    const data = req.body;
    res.json(await service.loginprof(data));
  } catch (error) {
    res.send(error.name);
  }
};

// update data in data base
controller.update = async function (req, res) {
  try {
    const data1 = req.senddata;
    const data2 = req.body;
    const jwtdata = req.headers.token;
    res.json(await service.updateuser(data1, data2, jwtdata));
  } catch (error) {
    res.send(error.name);
  }
};

//filter professionalby type

controller.search = async function (req, res) {
  try {
    //const data=req.body;
    const data = req.params;
    const result = await service.searchprofetional(data);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};

controller.updatepassword = async function (req, res) {
  try {
    const email = req.body.email;
    const newpassword = req.body.confirmpassword;
    res.json(await service.updateuserpassword(email, newpassword));
  } catch (error) {
    res.send(error.name);
  }
};
//logout from web pages

controller.logout = async function (req, res) {
  try {
    let data = req.headers.token;
    res.send(await service.logoutuser(data));
  } catch (error) {
    res.send(error.name);
  }
};

controller.feedback = async function (req, res) {
  try {
    const data = req.body;
    res.json(await service.feedback(data));
  } catch (error) {
    res.send(error.name);
  }
};

controller.feedbackstatus = async function (req, res) {
  try {
    const data = req.body;
    res.json(await service.feedbackstatus(data));
  } catch (error) {
    res.send(error.name);
  }
};

// const decode= async function(){
//      let date = new Date()/1000;
//      console.log(date);
//     let res=jwt_decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1yaW5tb3lkYXMyNDVAZ21haWwuY29tIiwiaWF0IjoxNjc4MzY1ODUzLCJleHAiOjE2NzgzNjU4NzN9.v0PhkrL1Zv9cJqjB6fLbI379zTAxss8tYD9DBqS4mFM');
//     console.log(res);
// }

module.exports = controller;
