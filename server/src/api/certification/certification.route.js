import { Router } from "express";
import { authJwt } from "../../service/passport.service";
import * as certificationController from "./certification.controller";
import permit from "../../service/permission.service";
import pagination from "../../helper/pagination";

const routes = Router();

/**
 * Create new certification (Only government)
 * POST api/v1/certification
 */
routes.post(
  "/",
  authJwt,
  // permit("government"),
  certificationController.createCertification
);

/**
 * Update certification
 * POST api/v1/certification/{{idCertification}}
 */
routes.put(
  "/:idCertification",
  authJwt,
  certificationController.updateCertification
);

/**
 * Delete certification
 * DELETE api/v1/certification/{{idCertification}}
 */
routes.delete(
  "/:idCertification",
  authJwt,
  certificationController.deleteCertification
);

/**
 * Activate certification (Only owners)
 * PUT api/v1/certification/activate/{{idCertification}}
 */
routes.put("/edit/:txHash", authJwt, certificationController.editCertification);

/**
 * Activate certification (Only owners)
 * PUT api/v1/certification/activate/{{idCertification}}
 */
routes.put(
  "/activate/:idCertification",
  authJwt,
  certificationController.activateCertification
);

/**
 * Activate sale property (Only owners)
 * PUT api/v1/certification/sale/{{idCertification}}
 */
routes.put(
  "/sale/:idCertification",
  authJwt,
  certificationController.activateSales
);

/**
 * Activate certification (Only owners)
 * PUT api/v1/certification/activate/{{idCertification}}
 */
routes.put(
  "/cancel-sale/:idCertification",
  authJwt,
  certificationController.cancelSale
);

/**
 * Get all properties activated (include selling)
 * GET api/v1/certification
 */
routes.get("/", certificationController.getAllActivatedCertificates);

/**
 * Get all properties currently on sale
 * GET api/v1/certification/selling
 */
routes.get(
  "/selling",
  pagination,
  certificationController.getAllPropertiesOnSale
);

/**
 * Get all properties currently of user
 * GET api/v1/certification/user
 */
routes.get("/user", authJwt, certificationController.getAllPropertiesOfUser);

/**
 * GET all certificate
 * GET api/v1/certification/
 */
routes.get("/all-status", certificationController.getAllCertificates);

// /**
//  * Get certification information
//  * GET api/v1/certification/{{idCertification}}
//  */
// routes.get("/:idCertification", certificationController.getCertification);

/**
 * GET certificate information with id in blockchain
 * GET api/v1/certification/id-in-blockchain
 */
routes.get(
  "/id-in-blockchain/:idInBlockchain",
  certificationController.getCertificationWithIdInBlockchain
);

/**
 * GET certificate information with txHash
 * GET api/v1/certification/{{txHash}}
 */
routes.get("/:txHash", certificationController.getCertificationWithTxHash);

/**
 * GET certificate information with txHash
 * GET api/v1/certification/owners/{{txHash}}
 */
routes.get(
  "/owners/:txHash",
  certificationController.getOwnersInfoOfCertificate
);

export default routes;
