import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    buyer: [
      {
        _id: false,
        publicAddress: { type: String }, // multiple publicAddress of user
        isAccept: { type: Boolean },
      },
    ],
    seller: [
      {
        _id: false,
        publicAddress: { type: String },
        isAccept: { type: Boolean },
      },
    ],
    price: Number,
    downPayment: Number,
    idProperty: String,
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
