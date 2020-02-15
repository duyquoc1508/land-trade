import * as userController from "./user.controller";
import { Router } from "express";
import { authJwt } from "../../service/passport.service";

const routes = new Router();

/**GET api/v1/users
 * req.query.publicAddress
 */
routes.get("/", userController.checkAddressRegistered);

/**GET api/v1/users/{{publicAddress}}
 * req.params.publicAddress
 */
routes.get("/:publicAddress", authJwt, userController.getUserProfile);

/**POST api/v1/users
 * req.body.publicAddress
 */
routes.post("/", userController.createUser);

export default routes;
