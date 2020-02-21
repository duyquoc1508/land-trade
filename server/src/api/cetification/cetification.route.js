import { Router } from "express";
import { authJwt } from "./../../service/passport.service";
import * as cetificationController from "./cetification.controller";
import permit from "./../../service/permission.service";

const routes = Router();

routes.get("/:idCetification", cetificationController.getCetification);

// Only governments can create certificates
routes.post(
  "/",
  authJwt,
  // permit("government"),
  cetificationController.createCetification
);

routes.put(
  "/:idCetification",
  authJwt,
  cetificationController.updateCetification
);

routes.delete(
  "/:idCetification",
  authJwt,
  cetificationController.deleteCetification
);

export default routes;
