import User from "./user.model";
import { ErrorHandler } from "../../helper/error";
import { sendMail } from "../../service/mailer.service";
import jwt from "jsonwebtoken";

async function checkExistsAddress(publicAddress) {
  const user = await User.findOne({ publicAddress });
  if (!user) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check address exists in database
 * @return {User}
 */
export async function checkAddressRegistered(req, res, next) {
  try {
    // If a query string publicAddress=... is given, then filter results
    const publicAddress = req.query.publicAddress;
    const user = await User.findOne({ publicAddress })
      .select({ nonce: 1 })
      .lean();
    if (!user) {
      throw new ErrorHandler(404, "Public address not found!");
    }
    return res.status(200).json({
      statusCode: 200,
      data: user
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Create new user
 * @return {User}
 */
export async function createUser(req, res, next) {
  try {
    const { publicAddress } = req.body;
    const user = await User.create({ publicAddress });
    return res.status(201).json({
      statusCode: 201,
      data: user
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get full user profile with publicAddress
 */
export async function getUserProfile(req, res, next) {
  // AccessToken payload is in req.user, especially its '_id' field
  // userId is the params in /user/:userId
  try {
    const publicAddress = req.params.publicAddress;
    const user = await User.findOne({ publicAddress });
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    return res.status(200).json({
      statusCode: 200,
      data: user
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(req, res, next) {
  try {
    const newUser = req.body;
    // send emal verify if user update new email
    if (req.body.email) {
      newUser["isVerifired"] = false;
    }
    const user = await User.findByIdAndUpdate(req.user._id, newUser, {
      new: true
    }).lean();
    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
}

/**
 * Send mail
 */
export async function send(req, res, next) {
  try {
    const user = await User.findOne({
      _id: req.user._id,
      isVerifired: false
    }).lean();
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    if (user.email) {
      const link =
        "http://" +
        req.get("host") +
        "/api/v1/users/verify?token=" +
        req.headers.authorization.split(" ")[1];
      const mailOptions = {
        from: "landtrade.cskh@gmail.com",
        to: user.email,
        subject: "Sending Email using Node.js",
        html:
          "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
          link +
          ">Click here to verify</a>"
      };
      sendMail(req, res, next, mailOptions);
    } else {
      return res
        .status(404)
        .json({ statusCode: 404, message: "Email address not found" });
    }
  } catch (error) {
    next(error);
  }
}

// Verify email
export async function verifyEmail(req, res, next) {
  try {
    const token = req.query.token;
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    await User.findByIdAndUpdate(user._id, { isVerifired: true }).lean();
    return res
      .status(200)
      .json({ statusCode: "200", message: "Verify email successfully" });
  } catch (error) {
    next(error);
  }
}

// Search user with idNumber or publicAddress
export async function search(req, res, next) {
  try {
    const size = parseInt(req.query.size, 0) || 10;
    const searchRegex = new RegExp(".*" + req.query.q + ".*", "i");
    const listUser = await User.find({
      $or: ["idNumber", "publicAddress"].map(key => ({
        [key]: { $regex: searchRegex }
      }))
    })
      .limit(size)
      .lean();
    return res.status(200).json({ statusCode: 200, data: listUser });
  } catch (error) {
    next(error);
  }
}

// Get your personal information
export async function getPersonalInfo(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    return res.status(200).json({ statusCode: 200, data: user });
  } catch (error) {
    next(error);
  }
}

// get all properties of user
export async function getAllPropertiesOfUser(req, res, next) {
  try {
    const listProperties = await User.findById(req.user._id)
      .populate({
        path: "properties"
      })
      .select("properties");
    console.log(listProperties);
    if (listProperties.length === 0)
      throw new ErrorHandler(404, "There are no properties found");
    return res.status(200).json({ statusCode: 200, data: listProperties });
  } catch (error) {
    next(error);
  }
}
