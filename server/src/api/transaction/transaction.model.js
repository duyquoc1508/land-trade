import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionState = [
  "DEPOSIT_REQUEST",
  "DEPOSIT_CONFIRMED",
  "PAYMENT_REQUEST",
  "PAYMENT_CONFIRMED",
  "CANCELED"
];

const cancellationStatus = [
  "DEPOSIT_CANCELED_BY_BUYER",
  "DEPOSIT_CANCELED_BY_SELLER",
  "DEPOSIT_BROKEN_BY_SELLER",
  "DEPOSIT_BROKEN_BY_BUYER",
  "TRANSFER_CANCELED_BY_SELLER"
];

const transactionSchema = new Schema(
  {
    buyers: { type: Array },
    sellers: { type: Array },
    idPropertyInBlockchain: { type: String },
    transferPrice: { type: String },
    depositPrice: { type: String },
    timeStart: { type: Date }, // = timeDeposit
    timeEnd: { type: Date },
    transactionHash: { type: String },
    idInBlockchain: { type: Number },
    // deposit: { txHash: String, time: Number},
    depositConfirmed: { txHash: String, time: Date },
    payment: { txHash: String, time: Date },
    paymentConfirmed: { txHash: String, time: Date },
    transactionCanceled: {
      txHash: String,
      time: Date,
      reason: { type: String, enum: cancellationStatus }
    },
    state: {
      type: String,
      enum: transactionState,
      default: transactionState[0] // DEPOSIT_REQUEST
    }
  },
  { timestamps: true }
);

transactionSchema.index({ transactionHash: 1 }, { unique: true });

export default mongoose.model("Transaction", transactionSchema);
