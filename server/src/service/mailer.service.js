import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  sevice: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.USERNAME_EMAIL,
    pass: process.env.PASSWORD_EMAIL
  }
});

export function sendMail(_req, res, _next, mailOptions) {
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      res.status(400).json({ statusCode: 400, message: err });
    } else {
      res.status(200).json({ statusCode: 200, message: info.response });
    }
  });
}
