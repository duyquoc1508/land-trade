// import { bufferToHex } from "ethereumjs-util";
import { personalSign, recoverPersonalSignature } from "eth-sig-util";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "./../user/user.model";
import { ErrorHandler } from "./../../helper/error";

let tokenList = [];

export async function sign(req, res, _next) {
  try {
    const { nonce, publicAddress } = req.body;
    const msgBufferHex = publicAddress.toString("hex");
    console.log(msgBufferHex);
    const msg = `I am signing my one-time nonce: ${nonce}`;
    let signature = personalSign(msg, { data: msgBufferHex });
    console.log(signature);
    return res.status(200).json({ signature, publicAddress });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
}

export async function handleAuthentication(req, res, next) {
  const { signature, publicAddress } = req.body;
  try {
    if (!signature || !publicAddress) {
      throw new ErrorHandler(
        400,
        "Request should have signature and publicAddress"
      );
    }
    //1. get user with given publicAddress
    const user = await User.findOne({ publicAddress });
    if (!user) {
      throw new ErrorHandler(
        404,
        `User with publicAddress ${publicAddress} is not found`
      );
    }
    //2. Varify digital signature
    // We now are in possession of msg, publicAddress and signature
    // We will use a helper from eth-sig-util to extract the address from the signature
    const msg = `I am signing my one-time nonce: ${user.nonce}`;
    const msgBufferHex = msg.toString("hex");
    const address = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature
    });
    // The signature verification is successful if the address found with recoverPersonalSignature
    // matches the initial publicAddress
    if (!(address.toLowerCase() === publicAddress.toLowerCase())) {
      throw new ErrorHandler(401, "Signature verification failed");
    }
    //3. generate a new nonce for user
    const newNonce = Math.floor(Math.random() * 10000);
    await User.findByIdAndUpdate(user._id, { nonce: newNonce });
    //4. Create JWT
    const payload = {
      publicAddress,
      _id: user._id,
      role: user.role
    };
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "7d";
    const accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || "access-token-landtrade";
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
    const refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET || "refresh-token-landtrade";
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessTokenLife
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshTokenLife
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      domain: "127.0.0.1"
      // origin
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      domain: "127.0.0.1"
      // origin
    });
    tokenList.push(refreshToken);
    return res.status(200).json({
      statusCode: 200,
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (refreshToken == null)
      throw new ErrorHandler(401, "Token must be provided");
    if (!tokenList.includes(refreshToken))
      throw new ErrorHandler(403, "Invalid refresh token");
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        next(err);
      }
      const payload = {
        _id: user._id,
        publicAddress: user.publicAddress
      };
      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "7d";
      const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || "access-token-landtrade";
      const accessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: accessTokenLife
      });
      return res.status(200).json({ statusCode: 200, accessToken });
    });
  } catch (error) {
    next(error);
  }
}
