import * as authController from "./auth.controller";
import { Router } from "express";

const routes = new Router();

/**POST api/v1/auth/login
 * req.body.signature
 * req.body.publicAddress
 */
routes.post("/login", authController.handleAuthentication);

/**GET api/v1/auth/sign
 * req.body.publicAddress
 * req.body.nonce
 */
routes.get("/sign", authController.sign);

/**POST api/v1/auth/refresh-token
 * req.body.refreshToken
 */
routes.post("/refresh-token", authController.refreshToken);

export default routes;
