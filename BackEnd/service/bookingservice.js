const service = {};
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: ".env" });
const { MongoClient, ObjectId } = require("mongodb");

// pendingBookingArea collection create
const pendingBookingArea = async function () {
  return new MongoClient("mongodb://localhost:27017")
    .db("koushiknandi")
    .collection("pendingBookingArea");
};

service.createbooking = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const connect = await pendingBookingArea();
      const result = await connect.insertOne(data);
      resolve({ success: true });
    } catch (error) {
      reject(error);
    }
  });
};

service.pendingbooking = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const connect = await pendingBookingArea();
      if (data.type == "professional") {
        let result = await connect
          .find({ "ProfDetails.email": data.email })
          .toArray();
        resolve(result);
      } else {
        let result = await connect
          .find({ "UserDetails.email": data.email })
          .toArray();
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  });
};

service.pendingupdate = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const match = {};
      const connect = await pendingBookingArea();
      if (data.action) {
        match[data.action] = true;
        match["PendingBooking"] = false;
      }
      //const result=await connect.find({"_id": new ObjectId(data.id)}).toArray();
      const result = await connect.updateOne(
        { _id: new ObjectId(data.id) },
        { $set: match }
      );
      resolve({ success: true });
    } catch (error) {
      reject(error);
    }
  });
};


service.complete=async function(data){
  return new Promise(async (resolve,reject)=>{
    try {
      const match={}
      match['Complete']=true;
      match['Cancel']=false;
      match['Accept']=false;
      match['PendingBooking']=false;
      const connect = await pendingBookingArea();
      const result =await connect.updateOne({_id: new ObjectId(data.id)},{$set:match});
      resolve(result);
    } catch (error) {
      console.log(error);
    }
  })
}


module.exports = service;
