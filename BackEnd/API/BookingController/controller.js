const bookingcontroller = {};
const service = require("../../service/bookingservice");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.post(
  bodyParser.urlencoded({
    extended: false,
  })
);

bookingcontroller.createBook = async function (req, res) {
  try {
    const data = req.body;
    let result = await service.createbooking(data);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};

bookingcontroller.pendingbooking = async function (req, res) {
  try {
    const data = req.body;
    res.json(await service.pendingbooking(data));
  } catch (error) {
    res.send(error);
  }
};

bookingcontroller.pendingupdate = async function (req, res) {
  try {
    const data = req.body;
    res.json(await service.pendingupdate(data));
  } catch (error) {
    res.send(error);
  }
};

bookingcontroller.complete=async function(req,res){
  try {
    const data=req.body;
    res.json(await service.complete(data));
  } catch (error) {
    res.send(error);
  }
}

module.exports = bookingcontroller;
