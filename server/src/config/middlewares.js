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
  return function (req, res, next) {
    req.body = camelcaseKeys(req.body, { deep: true });
    req.params = camelcaseKeys(req.params);
    req.query = camelcaseKeys(req.query);
    next();
  };
};

export default (app) => {
  app.use(bodyParser.json({ limit: "500kb" }));
  app.use(bodyParser.urlencoded({ limit: "500kb", extended: true }));
  app.use(camelcase());
  app.use(passport.initialize());
  // app.use(cors({ origin: "http://localhost:8081" }));

  // Enable CORS from client-side
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
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
  }
  if (isDev) {
    // logger middlewares
    app.use(morgan("dev"));
  }
};
