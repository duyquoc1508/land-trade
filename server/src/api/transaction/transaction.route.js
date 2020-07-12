import * as transactionController from "./transaction.controller";
import { Router } from "express";
import { authJwt } from "../../service/passport.service";

const routes = Router();


/**
 * get all transaction
 * get api/v1/transaction/investing
 */
routes.get("/investing", transactionController.getAllTransactions);

/**
 * get most deals transaction
 * get api/v1/transaction/most-deals
 */
routes.get("/most-deals", transactionController.getMostDeals);

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

export default routes;
