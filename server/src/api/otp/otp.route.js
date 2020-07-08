import { Router } from "express";
import { authJwt } from "../../service/passport.service";
import Otp from "./otp.model";
import { ErrorHandler } from "../../helper/error";
import { sendMail } from "../../service/mailer.service";
import User from "../user/user.model";

const routes = Router();

routes.post("/verify-email", authJwt, async (req, res, next) => {
  try {
    if (!req.query.email) {
      throw new ErrorHandler(502, "Missing email params");
    }
    let checkExists = await Otp.findOne({ userId: req.user._id });
    let otp = checkExists
      ? await Otp.findOneAndUpdate(
          { userId: req.user._id },
          {
            expiedCode: Date.now() + 3e5,
            code: Math.floor(Math.random() * 1e6),
          },
          { new: true }
        )
      : await Otp.create({ userId: req.user._id, email: req.query.email });
    const mailOptions = {
      from: "landtrade.cskh@gmail.com",
      to: req.query.email,
      subject: "Verify account",
      html: `<h3>Mã xác thực của bạn là: </h3><b>${otp.code}</b>`,
    };
    sendMail(req, res, next, mailOptions);
  } catch (error) {
    next(error);
  }
});

routes.post("/phone", authJwt, (req, res) => {});

routes.post("/verify", authJwt, async (req, res, next) => {
  try {
    if (!req.query.email) {
      throw new ErrorHandler(502, "Missing email params");
    }
    let otp = await Otp.findOne({ userId: req.user._id });
    if (!otp) {
      throw new ErrorHandler(404, "No otp");
    }
    if (req.query.code != otp.code) {
      throw new ErrorHandler(400, "invalid code");
    }
    let currentTime = Date.now();
    if (currentTime >= otp.expiedCode) {
      throw new ErrorHandler(400, "expired code");
    }

    await User.updateOne(
      { _id: req.user._id },
      { isVerified: 1, email: req.query.email }
    );
    res.json({ message: "verify successful" });
  } catch (error) {
    next(error);
  }
});

export default routes;
