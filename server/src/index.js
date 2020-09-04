import express from "express";
import "./config/database";
import apiRoutes from "./api";
import { handleError } from "./helper/error";
import middlewaresConfig from "./config/middlewares";
import constants from "./config/constants";
import path from "path";
import { initializeListeners } from "./eventListener/listener";
import http from "http";
import { SocketService } from "./socketService";

const app = express();
// Setup socket io for realtime
const server = http.createServer(app);
app.set("socketService", new SocketService(server));

// Middlewares
middlewaresConfig(app);
app.use("/static", express.static("public"));

// Initialize event listener on blockchain
initializeListeners();

// Import routes to be served
apiRoutes(app);

app.get("/api", (_req, res) => {
  res.send("Wellcome to Landtrade APIs");
});

/** handle error */
app.use((err, _req, res, _next) => {
  handleError(err, res);
});

// return not found if not exists endpoint
app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found." });
});

server.listen(constants.PORT, "0.0.0.0", err => {
  if (err) {
    throw err;
  } else {
    console.log(`
Server running on port: ${constants.PORT}
--
Running mode: ${process.env.NODE_ENV}
--`);
  }
});

export const socketService = app.get("socketService");
