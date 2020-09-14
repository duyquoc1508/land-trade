import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import "dotenv/config";
import winston from "./winston";
// import compression from 'compression';
// import helmet from 'helmet';

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

export default app => {
  app.use(bodyParser.json({ limit: "500kb" }));
  app.use(bodyParser.urlencoded({ limit: "500kb", extended: true }));
  app.use(passport.initialize());

  // Enable CORS from client-side
  app.use(function(req, res, next) {
    // const allowedOrigins = [
    //   `${process.env.REACT_APP_BASE_URL}`,
    //   `${process.env.REACT_APP_BASE_URL}:${process.env.FRONT_END_PORT}`,
    //   `${process.env.FRONT_END_DOMAIN}`
    // ];
    // var origin = req.headers.origin;
    // if (allowedOrigins.indexOf(origin) > -1) {
    //   res.setHeader("Access-Control-Allow-Origin", origin);
    // }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Expose-Headers", "Content-Disposition");
    next();
  });

  if (isProd) {
    // app.use(compression());
    // app.use(helmet());
    // using combined instead tiny
    app.use(morgan("tiny", { stream: winston.stream }));
  }
  if (isDev) {
    // logger middlewares
    app.use(morgan("dev"));
  }
};
