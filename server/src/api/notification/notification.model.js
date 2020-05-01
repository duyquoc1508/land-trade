import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    userAddress: {
      type: String,
    },
    senderAddress: {
      type: String,
      default: "0x0",
    },
    url: {
      type: String,
    },
    message: {
      type: String,
    },
    isReaded: {
      type: Boolean, // true: seen
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);
