import Transaction from "../../api/transaction/transaction.model";
import Certification from "../../api/certification/certification.model";
import Notification from "../../api/notification/notification.model";
import User from "../../api/user/user.model";
import { socketService } from "../../index";
import * as State from "./State";
import * as socketEvent from "./SocketEvent";

// cancel state map to state in smart contract because state in smart contract return is interger
const cancelStateDetails = {
  "1": "DEPOSIT_CANCELED_BY_BUYER",
  "2": "DEPOSIT_CANCELED_BY_SELLER",
  "4": "DEPOSIT_BROKEN_BY_BUYER",
  "5": "DEPOSIT_BROKEN_BY_SELLER",
  "7": "TRANSFER_CANCELED_BY_SELLER",
};

// handle transaction created (DEPOSIT_REQUEST) // caller by buyer
export async function handleTransactionCreated(event) {
  try {
    const transaction = {
      buyers: event.returnValues.buyers,
      sellers: event.returnValues.sellers,
      idPropertyInBlockchain: event.returnValues.idCertificate,
      depositPrice: event.returnValues.depositPrice,
      transferPrice: event.returnValues.transferPrice,
      depositTime: event.returnValues.depositTime,
      timeStart: event.returnValues.timeStart * 1000,
      timeEnd: event.returnValues.timeEnd * 1000,
      idInBlockchain: event.returnValues.idTransaction,
      transactionHash: event.transactionHash,
    };
    Transaction.create(transaction);
    const data = {
      url: `/transaction/${event.transactionHash}`,
      message: "Bạn nhận được một lời đề nghị mua nhà.",
    };
    // notification
    const { sellers, buyers } = event.returnValues;
    sellers.map((seller) => {
      data.userAddress = seller;
      return Notification.create(data);
    });
    // emit event DEPOSIT_REQUEST for sellers
    sellers.forEach((seller) => {
      socketService.emitEventToIndividualClient(
        socketEvent.NEW_TRANSACTION,
        seller,
        data
      );
    });
  } catch (error) {
    console.log(error);
  }
}

// handle transaction accepted (DEPOSIT_CONFIRMED)  // called by seller
export async function handleTransactionAccepted(event) {
  try {
    // update state of transaction
    const transaction = await Transaction.findOneAndUpdate(
      { idInBlockchain: event.returnValues.idTransaction },
      {
        depositConfirmed: { txHash: event.transactionHash, time: new Date() },
        state: State.DEPOSIT_CONFIRMED,
      }
    );
    // set state is ACTIVATED // require using await here
    await Certification.updateOne(
      { idInBlockchain: transaction.idPropertyInBlockchain },
      {
        state: 3,
      }
    );
    // notification
    const data = {
      url: `/transaction/${transaction.transactionHash}`,
      message: "Bạn có một giao dịch được chấp nhận.",
    };
    transaction.buyers.map((seller) => {
      data.userAddress = seller;
      return Notification.create(data);
    });
    // emit event DEPOSIT_CONFIRMED to buyers
    transaction.buyers.forEach((buyer) => {
      socketService.emitEventToIndividualClient(
        socketEvent.DEPOSIT_CONFIRMED,
        buyer,
        data
      );
    });
    socketService.emitEventToIndividualClient(
      socketEvent.TRANSACTION_CHANGE_STATE,
      transaction.sellers[0], // send to sender
      { event: socketEvent.DEPOSIT_CONFIRMED, txHash: event.transactionHash }
    );
  } catch (error) {
    console.log(error);
  }
}

// handle buyer payment remaining amount to seller (PAYMENT_REQUEST)  // called by buyer
export async function handleTransactionPayment(event) {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { idInBlockchain: event.returnValues.idTransaction },
      {
        payment: { txHash: event.transactionHash, time: new Date() },
        state: State.PAYMENT_REQUEST,
      }
    );
    // notification
    const data = {
      url: `/transaction/${transaction.transactionHash}`,
      message: "Bạn có một giao dịch đã được thanh toán.",
    };
    transaction.sellers.map((seller) => {
      data.userAddress = seller;
      return Notification.create(data);
    });
    // emit event PAYMENT_REQUEST for owners
    transaction.sellers.forEach((seller) => {
      socketService.emitEventToIndividualClient(
        socketEvent.PAYMENT_REQUEST,
        seller,
        data
      );
    });
    socketService.emitEventToIndividualClient(
      socketEvent.TRANSACTION_CHANGE_STATE,
      transaction.buyers[0], // send to sender
      { event: socketEvent.PAYMENT_REQUEST, txHash: event.transactionHash }
    );
  } catch (error) {
    console.log(error);
  }
}

// handle transaction successfully (PAYMENT_CONFIRMED)  // called buy seller
export async function handleTransactionConfirmed(event) {
  try {
    // update state of transaction
    const transaction = await Transaction.findOneAndUpdate(
      { idInBlockchain: event.returnValues.idTransaction },
      {
        paymentConfirmed: { txHash: event.transactionHash, time: new Date() },
        state: State.PAYMENT_CONFIRMED,
      }
    );
    const { buyers, sellers } = transaction;
    // update state of certificate and change ownership
    const certificate = await Certification.findOneAndUpdate(
      { idInBlockchain: transaction.idPropertyInBlockchain },
      { state: 1, owners: transaction.buyers }
    );
    const idCertificate = certificate._id;
    // remove idCertificate in propertied field of seller in user collection
    const p1 = buyers.map(async (publicAddress) => {
      await User.updateOne(
        { publicAddress: publicAddress },
        { $push: { properties: idCertificate } }
      );
    });
    // push idCertificate in properties field of buyer in user collection
    const p2 = sellers.map(async (publicAddress) => {
      await User.updateOne(
        { publicAddress: publicAddress },
        { $pull: { properties: idCertificate } }
      );
    });
    Promise.all([Promise.all(p1), Promise.all(p2)]);
    // notifications
    const data = {
      url: `/transaction/${transaction.transactionHash}`,
      message: "Bạn có một giao dịch đã được xác nhận.",
    };
    buyers.map((buyer) => {
      data.userAddress = buyer;
      return Notification.create(data);
    });
    // emit event PAYMENT_CONFIRMED for owners
    buyers.forEach((buyer) => {
      socketService.emitEventToIndividualClient(
        socketEvent.PAYMENT_CONFIRMED,
        buyer,
        data
      );
    });
    socketService.emitEventToIndividualClient(
      socketEvent.TRANSACTION_CHANGE_STATE,
      transaction.sellers[0], // send to sender
      { event: socketEvent.PAYMENT_CONFIRMED, txHash: event.transactionHash }
    );
  } catch (error) {
    console.log(error);
  }
}

// handle transaction canceled
export async function handleTransactionCanceled(event) {
  try {
    // update state of transaction
    const transaction = await Transaction.findOneAndUpdate(
      { idInBlockchain: event.returnValues.idTransaction },
      {
        transactionCanceled: {
          txHash: event.transactionHash,
          time: new Date(),
          reason: cancelStateDetails[event.returnValues.state], // event.returnValue.state type "0"
        },
        state: State.CANCELED,
      }
    );
    // update state of certificate  // require using await here
    await Certification.updateOne(
      { idInBlockchain: transaction.idPropertyInBlockchain },
      { state: 2 }
    );
    const data = {
      url: `/transaction/${transaction.transactionHash}`,
      message: "Bạn có một giao dịch bị hủy.",
    };
    // if transaction canceled by buyer
    if (cancelStateDetails[event.returnValues.state].includes("BY_BUYER")) {
      transaction.sellers.forEach((seller) => {
        socketService.emitEventToIndividualClient(
          socketEvent.TRANSACTION_CANCELED,
          seller,
          data
        );
      });
      socketService.emitEventToIndividualClient(
        socketEvent.TRANSACTION_CHANGE_STATE,
        transaction.buyers[0], // send to sender
        {
          event: socketEvent.TRANSACTION_CANCELED,
          txHash: event.transactionHash,
        }
      );
    } else {
      // transaction canceled buy seller
      transaction.buyers.forEach((buyer) => {
        socketService.emitEventToIndividualClient(
          socketEvent.PAYMENT_CONFIRMED,
          buyer,
          data
        );
      });
      socketService.emitEventToIndividualClient(
        socketEvent.TRANSACTION_CHANGE_STATE,
        transaction.sellers[0], // send to sender
        { event: socketEvent.PAYMENT_CONFIRMED, txHash: event.transactionHash }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
