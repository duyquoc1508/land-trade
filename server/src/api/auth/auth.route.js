import * as authController from "./auth.controller";
import { Router } from "express";

const routes = new Router();

/**POST api/v1/auth
 * req.body.signature
 * req.body.publicAddress
 */
routes.post("/login", authController.handleAuthentication);

/**POST api/v1/sign
 * req.body.publicAddress
 * req.body.nonce
 */
routes.post("/sign", authController.sign);

export default routes;
