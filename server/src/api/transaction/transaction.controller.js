import Transaction from "./transaction.model";
import { ErrorHandler } from "../../helper/error";
import Notification from "../notification/notification.model";
import Certification from "../certification/certification.model";

export async function getAllTransactions(req, res, next) {
  try {
    let transactions = await Transaction.find({})
      .sort({ updatedAt: -1 })
      .lean();

    let arrayIdCertificationInBlockchain = Array.from(
      new Set(transactions.map(item => item.idPropertyInBlockchain))
    );
    let properties = await Certification.find({
      idInBlockchain: arrayIdCertificationInBlockchain
    })
      .sort({ updatedAt: -1 })
      .lean();
    return res.status(200).json({
      statusCode: 200,
      data: {
        transactions,
        properties
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getMostDeals(req, res, next) {
  try {
    // db.exhibits.aggregate( [ { $unwind: "$tags" },  { $sortByCount: "$tags" } ] )
    let transactions = await Transaction.aggregate([
      { $sortByCount: "$idPropertyInBlockchain" },
      { $limit: 5 }
    ]);
    if (transactions.length === 0) {
      throw new ErrorHandler(404, "Transaction not found");
    }
    let properties = await Promise.all(
      transactions.map(idInBlockchain =>
        Certification.findOne({ idInBlockchain })
      )
    );
    if (properties.length === 0) {
      throw new ErrorHandler(404, "Property not found");
    }
    return res.status(200).json({
      statusCode: 200,
      data: properties
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyTransactions(req, res, next) {
  try {
    let transactionP1 = Transaction.find({
      buyers: req.user.publicAddress
    })
      .sort({ _id: -1 })
      .lean();
    let transactionP2 = Transaction.find({
      sellers: req.user.publicAddress
    })
      .sort({ _id: -1 })
      .lean();

    let [transactionBuy, transactionSale] = await Promise.all([
      transactionP1,
      transactionP2
    ]);

    let arrayIdCertificationInBlockchain = Array.from(
      new Set(
        [...transactionBuy, ...transactionSale].map(
          item => item.idPropertyInBlockchain
        )
      )
    );
    let properties = await Certification.find({
      idInBlockchain: arrayIdCertificationInBlockchain
    }).lean();
    return res.status(200).json({
      statusCode: 200,
      data: {
        transactionBuy,
        transactionSale,
        properties
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getTransaction(req, res, next) {
  try {
    const transaction = await Transaction.findOne({
      transactionHash: req.params.txHash
    }).lean();
    return res.status(200).json({ statusCode: 200, data: transaction });
  } catch (error) {
    next(error);
  }
}

/**
 * get all transactions of property ended =>  state CANCELED or PAYMENT_CONFIRMED
 */
export async function getAllTransactionsOfProperty(req, res, next) {
  try {
    const stateOfTransactionEnded = ["CANCELED", "PAYMENT_CONFIRMED"]; // this state => transaction possible modifier
    const idPropertyInBlockchain = req.params.idPropertyInBlockchain;
    const transaction = await Transaction.find({
      idPropertyInBlockchain,
      state: { $in: stateOfTransactionEnded }
    })
      .sort({ updatedAt: -1 }) // new to old
      .lean();
    // if (transaction.length === 0) {
    //   throw new ErrorHandler(404, "Not found transaction");
    // }
    return res.status(200).json({ statusCode: 200, data: transaction });
  } catch (error) {
    next(error);
  }
}
