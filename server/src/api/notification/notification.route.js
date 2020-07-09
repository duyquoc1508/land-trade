import { Router } from "express";
import * as notificationController from "./notification.controller";
import { authJwt } from "../../service/passport.service";
import pagination from "../../helper/pagination";
const routes = Router();

/**
 * Get all notifications of user
 * GET api/v1/notifications
 */
routes.get("/", authJwt, pagination, notificationController.getNotifications);

/**
 * @dev create notification for TEST. Notifications will be created when handling events from the blockchain.
 * Production: remove this endpoint
 */
routes.post("/", authJwt, notificationController.createNotification);

/**
 * @dev read notifications
 */
routes.put(
  "/:idNotification",
  authJwt,
  notificationController.readNotification
);

export default routes;
