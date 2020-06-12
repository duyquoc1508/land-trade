import Transaction from "./transaction.model";
import ErrorHandler from "../../helper/error";
import Notification from "../notification/notification.model";

export async function createTransaction(req, res, next) {
  try {
    let buyer = req.body.buyer.map((item) => ({
      publicAddress: item,
      isAccept: false,
    }));
    buyer[0].isAccept = true;
    const seller = req.body.seller.map((item) => ({
      publicAddress: item,
      isAccept: false,
    }));
    const { price, downPayment, idProperty } = req.body;
    const newTransaction = { buyer, seller, price, downPayment, idProperty };
    const transaction = await Transaction.create(newTransaction);
    const sellerContent = {
      senderAddress: req.user.publicAddress,
      url: `/transaction/${transaction._id}`,
      message: "Bạn nhận được một lời mời bán tài sản.",
    };
    const buyerContent = {
      senderAddress: req.user.publicAddress,
      url: `/transaction/${transaction._id}`,
      message: "Bạn được mời tham gia vào một giao dịch.",
    };
    const p1 = transaction.seller.map((seller) => {
      Notification.create({
        userAddress: seller.publicAddress,
        ...sellerContent,
      }).then();
    });
    const p2 = transaction.buyer.map((buyer) => {
      Notification.create({
        userAddress: buyer.publicAddress,
        ...buyerContent,
      }).then();
    });
    Promise.all([p1, p2]);
    return res.status(201).json({ statusCode: 201, data: transaction });
  } catch (error) {
    next(error);
  }
}

export async function getTransaction(req, res, next) {
  try {
    const transaction = await Transaction.findById(req.params.idTransaction);
    return res.status(200).json({ statusCode: 200, data: transaction });
  } catch (error) {
    next(error);
  }
}

export async function buyerAcceptTransaction(req, res, next) {
  try {
    const transaction = await Transaction.updateOne(
      {
        _id: req.params.idTransaction,
        "buyer.publicAddress": req.user.publicAddress,
      },
      { "buyer.$.isAccept": true },
      { new: true }
    );
    return res.status(200).json({ statusCode: 200, data: transaction });
  } catch (error) {
    next(error);
  }
}

export async function sellerAcceptTransaction(req, res, next) {
  try {
    const transaction = await Transaction.updateOne(
      {
        _id: req.params.idTransaction,
        "seller.publicAddress": req.user.publicAddress,
      },
      { "seller.$.isAccept": true },
      { new: true }
    );
    return res.status(200).json({ statusCode: 200, data: transaction });
  } catch (error) {
    next(error);
  }
}

export async function sellerRejectTransaction(req, res, next) {
  try {
    const transaction = await Transaction.updateOne(
      {
        _id: req.params.idTransaction,
        "seller.publicAddress": req.user.publicAddress,
      },
      { "seller.$.isAccept": false },
      { new: true }
    );
    return res.status(200).json({ statusCode: 200, data: transaction });
  } catch (error) {
    next(error);
  }
}

export async function buyerRejectTransaction(req, res, next) {
  try {
    const transaction = await Transaction.updateOne(
      {
        _id: req.params.idTransaction,
        "buyer.publicAddress": req.user.publicAddress,
      },
      { "buyer.$.isAccept": false },
      { new: true }
    );
    return res.status(200).json({ statusCode: 200, data: transaction });
  } catch (error) {
    next(error);
  }
}
