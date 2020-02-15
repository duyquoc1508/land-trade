import User from "./user.model";
import { ErrorHandler } from "../../helper/error";

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
    let user = await User.findOne({ publicAddress }).select("nonce");
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
