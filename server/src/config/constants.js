import "dotenv/config";

const JWT_SECRET =
  process.env.SECRET_KEY || "qwertyuiopasdfghjklzxcvbnm123456ss";

const devConfig = {
  MONGO_URL: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  JWT_SECRET,
};

const testConfig = {
  MONGO_URL: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  JWT_SECRET,
};

const prodConfig = {
  MONGO_URL: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  JWT_SECRET,
};

const defaultConfig = {
  PORT: process.env.PORT || 5000,
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
  ...envConfig(process.env.NODE_ENV),
};
