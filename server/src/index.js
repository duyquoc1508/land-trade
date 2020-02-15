import express from "express";
const app = express();
import "./config/database";
import apiRoutes from "./api";
import { handleError } from "./helper/error";
import middlewaresConfig from "./config/middlewares";
import constants from "./config/constants";

middlewaresConfig(app);

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

app.listen(constants.PORT, err => {
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
