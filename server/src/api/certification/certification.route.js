import { Router } from "express";
import { authJwt } from "../../service/passport.service";
import * as certificationController from "./certification.controller";
import permit from "../../service/permission.service";

const routes = Router();

/**
 * Get certification information
 * GET api/v1/certification/{{idCertification}}
 */
routes.get("/:idCertification", certificationController.getCertification);

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

export default routes;
