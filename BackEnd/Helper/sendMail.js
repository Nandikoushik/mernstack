const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const dotenv = require("dotenv");
dotenv.config();
const sendMail = async function (req, res) {
  try {
    const userEmail = req.body.email;
    const userName = req.body.Name || "Sir/Madam";
    const action = req.body.action;
    const type = req.body.type;
    let config = {
      service: "gmail",
      auth: {
        user: process.env.mailId,
        pass: process.env.mailPassword,
      },
    };

    const transporter = nodemailer.createTransport(config);

    const Mailgenerator = new Mailgen({
      theme: "default",
      product: {
        name: "S4U",
        link: "https://mailgen.js/",
      },
    });

    if (action === "signup") {
      var responce = {
        body: {
          name: userName,
          intro:
            "Your Registration Has been done .. Please Visit our site to get service",
          outro: "Looking For Service Visit Our Site....",
          copyright: "Copyright © 2016 Mailgen. All rights reserved.",
        },
      };
      mailsubject = `You Have Successfully Registered in S4U as ${type}`;
    } else if (action === "Book") {
      let address = req.body.customeraddress;
      let customerName = req.body.customerName;
      var responce = {
        body: {
          name: userName,
          intro: "You Have A Booking In your Cart",
          table: {
            data: [
              {
                CustomerName: customerName,
                " CustomerAddress": address,
              },
            ],
          },
          outro:
            "Looking For  More Service ........ Please  Visit Our Site....",
          copyright: "Copyright © 2023 S4U. All rights reserved.",
        },
      };
      mailsubject = "You Have Got A Booking From S4U !";
    } else if (action === "otp") {
      const otp = req.body.OTP;
      var responce = {
        body: {
          name: userName,
          intro: "Your Completion Code ",
          table: {
            data: [
              {
                "Completed Code": otp,
              },
            ],
          },
          outro:
            "Looking For  More Service ........ Please  Visit Our Site....",
          copyright: "Copyright © 2023 S4U. All rights reserved.",
        },
      };
      mailsubject = "You Have Got OTP From S4U";
    }

    let mail = Mailgenerator.generate(responce);
    let message = {
      from: "careerkoushik2023@gmail.com",
      to: userEmail,
      subject: mailsubject,
      html: mail,
    };
    transporter.sendMail(message).then(() => {
      res.json({
        success: true,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { sendMail };
