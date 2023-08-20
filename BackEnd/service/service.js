const service = {};
const jwt = require("jsonwebtoken");
var path = require("path");
require("dotenv").config({ path: ".env" });
const { MongoClient, ObjectId } = require("mongodb");
const dataBaseUrl='mongodb+srv://careerkoushik2023:kPalU2LaBTVivbNV@cluster0.2fxapyj.mongodb.net/MernStack01?retryWrites=true&w=majority';
//conect to userlist
const userconnect = async function () {
  return new MongoClient(dataBaseUrl)
    .db("MernStack01")
    .collection("userlist");
};
// token collection create
const tokencollection = async function () {
  return new MongoClient(dataBaseUrl)
    .db("MernStack01")
    .collection("token");
};

//connect to profesionallist
const profconnect = async function () {
  return new MongoClient(dataBaseUrl)
    .db("MernStack01")
    .collection("vendor");
};

//connnect to profesional token
const proftokencollection = async function () {
  return new MongoClient(dataBaseUrl)
    .db("MernStack01")
    .collection("token");
};

const bookingarea = async function () {
  return new MongoClient(dataBaseUrl)
    .db("MernStack01")
    .collection("pendingBookingArea");
};

// FOR REGISTRATION BY USER TO CREATE ACOUNT
service.createuser = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const connect = await userconnect();
      const result = await connect.insertOne(data);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// FOR LOGIN THEIR ACOUNT AND TOKEN GENERATE
service.loginuser = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const connect = await userconnect();
      //Generate New Token
      const tokengenerate = async function () {
        let token = jwt.sign({ email: data.email }, process.env.TOKEN_KEY, {
          expiresIn: "30s",
        });
        // await tokendata.insertOne({
        //   token: `${token}`,
        //   status: true,
        //   userid: `${res[0]._id}`,
        //   genaratetime: new Date(),
        // });
      };
      //checking concept if  user click another login button
      let res = await connect.findOne({
        $and: [{ email: data.email }, { password: data.password }],
      });
      if (res.length != 0) {
        resolve({ success: true, data: res });
      } else {
        resolve({ success: false });
      }
    } catch (error) {
      reject({ error: error.name });
    }
  });
};

//create a profesional
service.createprof = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const connect = await profconnect();
      const result = await connect.insertOne(data);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

//login as a profesional
service.loginprof = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const connect = await profconnect();
      const tokendata = await proftokencollection();
      //Generate New Token
      const tokengenerate = async function () {
        let token = jwt.sign({ email: data.email }, process.env.TOKEN_KEY, {
          expiresIn: "30s",
        });
        await tokendata.insertOne({
          token: `${token}`,
          status: true,
          userid: `${res[0]._id}`,
          genaratetime: new Date(),
        });
      };
      let res = await connect.findOne({
        $and: [{ email: data.email }, { password: data.password }],
      });
      if (res.length != 0) {
        resolve({ success: true, data: res });
      } else {
        resolve({ success: false });
      }
    } catch (error) {
      reject({ error: error.name });
    }
  });
};

// UPDATE DATA AFTER LOGIN
service.updateuser = async function (data1, data2, jwtdata) {
  return new Promise(async (resolve, reject) => {
    try {
      const connect = await userconnect();
      const tokenconnect = await tokencollection();
      const l1 = await tokenconnect.find({ token: jwtdata }).toArray();
      if (l1[0].status == true && l1[0].expire == false) {
        await connect.updateOne(
          { email: data1.email },
          { $set: { password: data2.password } }
        );
        resolve("data update success");
      } else {
        resolve("Please log in first ");
      }
    } catch (error) {
      reject(error.name);
    }
  });
};

//find list of professional with their service type by params
service.searchprofetional = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const connect = await profconnect();
      const result = await connect.find(data).toArray();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

//update User Password if user forgot password
service.updateuserpassword = async function (email, newpassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const connect = await userconnect();
      await connect.updateOne(
        { email: email },
        { $set: { password: newpassword } }
      );
      resolve("Password update success");
    } catch (error) {
      reject(error.name);
    }
  });
};

// for logout user acount
service.logoutuser = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenconnect = await tokencollection();
      const l1 = await tokenconnect.find({ token: `${data}` }).toArray();
      if (l1[0].status == true) {
        await tokenconnect.updateOne(
          { token: `${data}` },
          { $set: { status: false } }
        );
        resolve("logout successful");
      } else {
        resolve("Another logout without login");
      }
    } catch (error) {
      reject(error.name);
    }
  });
};

service.feedback = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const email = data.email;
      const feedback = data.feedback;
      const connect = await profconnect();
      await connect.updateOne(
        { email: email },
        { $set: { feedback: feedback } }
      );
      resolve("FeedBack Update Success");
    } catch (error) {
      reject(error.name);
    }
  });
};

service.feedbackstatus = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const id = data.id;
      const connect = await bookingarea();
      await connect.updateOne(
        { _id: new ObjectId(id) },
        { $set: { feedbackStatus: true } }
      );
      resolve("FeedBackstatus Update Success");
    } catch (error) {
      reject(error.name);
    }
  });
};

module.exports = service;
