import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import camelcaseKeys from "camelcase-keys";
import "dotenv/config";
// import compression from 'compression';
// import helmet from 'helmet';

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

// middlewares convert all field names on form to camelcase
const camelcase = () => {
  return function(req, res, next) {
    req.body = camelcaseKeys(req.body, { deep: true });
    req.params = camelcaseKeys(req.params);
    req.query = camelcaseKeys(req.query);
    next();
  };
};

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(camelcase());
  app.use(passport.initialize());
  app.use(cors({ origin: "http://localhost:8081" }));

  if (isProd) {
    // app.use(compression());
    // app.use(helmet());
  }
  if (isDev) {
    // logger middlewares
    app.use(morgan("dev"));
  }
};
