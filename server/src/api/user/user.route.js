import * as userController from "./user.controller";
import { Router } from "express";
import { authJwt } from "../../service/passport.service";

const routes = new Router();

/**
 * Check user registered
 * GET api/v1/users
 */
routes.get("/", userController.checkAddressRegistered);

/**
 * Send email
 * GET api/v1/api/users/send
 */
routes.get("/send", authJwt, userController.send);

/**
 * Verify email
 * GET api/vi/users/verify?token={{accessToken}}
 */
routes.get("/verify", userController.verifyEmail);

/**
 * Get user with idNumber and publicAddress
 * GET api/v1/users/search?idNumber={{idNumber}}
 */
routes.get("/search", userController.search);

/**
 * Get user profile
 * GET api/v1/users/{{publicAddress}}
 */
routes.get("/:publicAddress", authJwt, userController.getUserProfile);

/**
 * Create new user
 * POST api/v1/users
 */
routes.post("/", userController.createUser);

/**
 * Update user profile
 * PUT api/v1/users
 */
routes.put("/", authJwt, userController.updateUserProfile);

export default routes;
