import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
  },
  code: {
    type: Number,
    default: Math.floor(Math.random() * 1e6),
  },
  expiedCode: {
    type: Date,
    default: Date.now() + 3e10,
    // 3e5, // 5p
  },
});

export default mongoose.model("Otp", otpSchema);
