const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config({ path: ".env" });
const jwtverify = async function (req, res, next) {
  try {
    let jwtdata = req.headers.token;
    let data = await jwt.verify(jwtdata, process.env.TOKEN_KEY);
    req.senddata = data;
    // console.log(`data is : ${data.toArray()}`);
    //req.jwtdata=jwtdata;
    if (data) {
      next();
    }
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).send({ message: "Token-Time-Out" });
    } else {
      return res.status(401).send("You token will modified");
    }
  }
};
module.exports = jwtverify;
