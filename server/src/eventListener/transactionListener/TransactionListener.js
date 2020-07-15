import web3 from "../web3Provider";
import TransactionContract from "../../contracts/Transaction.json";
import TransactionEvent from "./Event";
import * as helper from "./helper";
import { transactionContractAddress } from "../../config/common-path";

const instanceContract = new web3.eth.Contract(
  TransactionContract.abi,
  transactionContractAddress
);

// listen all event emitted from RealEstate contract
export function transactionListener() {
  instanceContract.events
    .allEvents()
    .on("data", event => {
      console.log(`=========== Event: ${event.event} ===========`);
      return handleEvent(event);
    })
    .on("error", console.error);
}

async function handleEvent(event) {
  console.log(event);
  switch (event.event) {
    // transaction created == buyer request deposit
    case TransactionEvent.TRANSACTION_CREATED:
      return helper.handleTransactionCreated(event);
    //  seller accept transaction and sign deposit
    case TransactionEvent.DEPOSIT_SIGNED:
      return helper.handleTransactionAccepted(event);
    // buyer send remaining amount to seller
    case TransactionEvent.PAYMENT:
      return helper.handleTransactionPayment(event);
    // seller received fund and transfer ownership
    case TransactionEvent.TRANSACTION_SUCCESS:
      return helper.handleTransactionConfirmed(event);
    // cancel transaction
    case TransactionEvent.TRANSACTION_CANCELED:
      return helper.handleTransactionCanceled(event);
    default:
      throw new Error("Type event does not exist");
  }
}
