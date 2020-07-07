import * as userController from "./user.controller";
import { Router } from "express";
import { authJwt } from "../../service/passport.service";
import { userSchema } from "./user.validator";
import { validateRequest } from "../../utils/validator";

const routes = new Router();

/**
 * Get all user
 * GET api/v1/api/users/
 */
routes.get("/", authJwt, userController.getAllUser);

/**
 * Check user registered
 * GET api/v1/users
 */
routes.get("/check_registed", userController.checkAddressRegistered);

/**
 * Get all properties of user
 * GET api/v1/users/properties
 */
routes.get("/properties", authJwt, userController.getAllPropertiesOfUser);

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
 * Verify email
 * GET api/vi/users/verify?token={{accessToken}}
 */
routes.get("/verify-account", authJwt, userController.verifyAccount);

/**
 * Get user with idNumber and publicAddress
 * GET api/v1/users/search?idNumber={{idNumber}}
 */
routes.get("/search", userController.search);

/**
 * Get my user profile
 * GET api/v1/users/me
 */
routes.get("/me", authJwt, userController.getPersonalInfo);

/**
 * Get user profile
 * GET api/v1/users/{{publicAddress}}
 */
routes.get("/:publicAddress", userController.getUserProfile);

/**
 * Get user profile
 * GET api/v1/users/{{publicAddress}}
 */
routes.get("/", userController.getUserProfile);

/**
 * Create new user
 * POST api/v1/users
 */
routes.post(
  "/",
  validateRequest(userSchema.create, "body"), // validate request.body
  userController.createUser
);

/**
 * Update user profile
 * PUT api/v1/users
 */
routes.put(
  "/",
  authJwt,
  validateRequest(userSchema.update, "body"), // validate request body
  userController.updateUserProfile
);

export default routes;
