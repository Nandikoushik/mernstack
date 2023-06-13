const express = require("express");
const route = express.Router();
const jwtverify = require("../Authentication/jwtverify");
const controller = require("../API/controller/controlling");
const bookingcontroller = require("../API/BookingController/controller");
const { sendMail } = require("../Helper/sendMail");

route.post("/user-Registration", controller.registration);
route.post("/user-login", controller.login);
route.post("/professional-Registration", controller.profregistration);
route.post("/professional-login", controller.proflogin);
route.post("/updatepassword", controller.updatepassword);
route.post("/update", jwtverify, controller.update);
route.post("/logout", jwtverify, controller.logout);
route.get("/proflist/:service", controller.search);
route.post("/booking", bookingcontroller.createBook);
route.post("/pending", bookingcontroller.pendingbooking);
route.put("/pendingupdate", bookingcontroller.pendingupdate);
route.post("/sendMail", sendMail);
route.put("/complete", bookingcontroller.complete);
route.post("/feedback", controller.feedback);
route.post("/feedbackstatus", controller.feedbackstatus);

module.exports = route;
