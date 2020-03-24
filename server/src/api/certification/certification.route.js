import { Router } from "express";
import { authJwt } from "../../service/passport.service";
import * as certificationController from "./certification.controller";
import permit from "../../service/permission.service";

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
 * Get all properties activated (include selling)
 * GET api/v1/certification
 */
routes.get("/", certificationController.getAllActivatedCertificates);

/**
 * Get all properties currently on sale
 * GET api/v1/certification/selling
 */
routes.get("/selling", certificationController.getAllPropertiesOnSale);

/**
 * Get all properties currently of user
 * GET api/v1/certification/user
 */
routes.get("/user", authJwt, certificationController.getAllPropertiesOfUser);

/**
 * Get certification information
 * GET api/v1/certification/{{idCertification}}
 */
routes.get("/:idCertification", certificationController.getCertification);

export default routes;
