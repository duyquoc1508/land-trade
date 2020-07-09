import * as transactionController from "./transaction.controller";
import { Router } from "express";
import { authJwt } from "../../service/passport.service";

const routes = Router();

/**
 * Create new transaction
 * POST api/v1/transaction
 */
routes.post("/", authJwt, transactionController.createTransaction);

/**
 * get allall transaction
 * get api/v1/transaction/investing
 */
routes.get("/investing", transactionController.getAllTransactions);

/**
 * get my transaction
 * get api/v1/transaction
 */
routes.get("/", authJwt, transactionController.getMyTransactions);

/**
 * Get info transaction
 * POST api/v1/transactionHash
 */
routes.get("/:txHash", transactionController.getTransaction);

/**
 * Get all transaction ended of property
 * GET api/v1/transaction
 */
routes.get(
  "/property/:idPropertyInBlockchain",
  transactionController.getAllTransactionsOfProperty
);

/**
 * Seller accept transaction
 * POST api/v1/transaction
 */
routes.put(
  "/seller-accept/:idTransaction",
  authJwt,
  transactionController.sellerAcceptTransaction
);

/**
 * Buyer accepnt transaction
 * POST api/v1/transaction
 */
routes.put(
  "/buyer-accept/:idTransaction",
  authJwt,
  transactionController.buyerAcceptTransaction
);

/**
 * Seller reject transaction
 * POST api/v1/transaction
 */
routes.put(
  "/seller-reject/:idTransaction",
  authJwt,
  transactionController.sellerRejectTransaction
);

/**
 * Buyer reject transaction
 * POST api/v1/transaction
 */
routes.put(
  "/buyer-reject/:idTransaction",
  authJwt,
  transactionController.buyerRejectTransaction
);

export default routes;
