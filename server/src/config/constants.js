import "dotenv/config";

const JWT_SECRET = process.env.SECRET_KEY;

const devConfig = {
  MONGO_URL: "mongodb://localhost:27017/landtrade_dev",
  JWT_SECRET
};

const testConfig = {
  MONGO_URL: "mongodb://localhost:27017/landtrade_test",
  JWT_SECRET
};

const prodConfig = {
  MONGO_URL: "mongodb://localhost:27017/landtrade_prod",
  JWT_SECRET
};

const defaultConfig = {
  PORT: process.env.PORT || 5000
};

function envConfig(env) {
  switch (env) {
    case "development":
      return devConfig;
    case "test":
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
};
