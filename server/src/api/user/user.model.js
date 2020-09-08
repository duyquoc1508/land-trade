import mongoose from "mongoose";
import { stringify } from "qs";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // refresh every time user sign in app
    nonce: {
      type: Number,
      default: Math.floor(Math.random() * 10000)
    },
    publicAddress: {
      type: String,
      unique: [true, "Public address is unique"],
      trim: true,
      index: true
    },
    fullName: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ["Super Admin", "Notary", "owner"],
      default: "owner"
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "Email is unique"],
      sparse: true //prevent duplicate value but allow multiple null
    },
    // 0-chua duyet, 1-dang cho, 2-da duyet
    isVerified: {
      type: Number,
      default: 0
    },
    idNumber: {
      type: String,
      index: true,
      trim: true,
      unique: [true, "ID number is unique"],
      sparse: true //prevent duplicate value but allow multiple null
    },
    homeLand: String,
    birthday: String,
    permanentResidence: String,
    imageIdNumber: [{ type: String }],
    phoneNumber: {
      type: String,
      trim: true
    },
    properties: [
      {
        type: Schema.Types.ObjectId,
        ref: "Certification"
      }
    ],
    avatar: {
      type: String,
      default: `avt_${Math.floor(Math.random() * 10) + 1}.png` //generate default avatar
    }
  },
  { timestamps: true }
);

userSchema.index({ publicAddress: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
