import mongoose from "mongoose";
import constants from "./constants";

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// Connect the db with the url provide
const connectToDatabase = () => {
  try {
    mongoose.connect(constants.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (err) {
    mongoose.createConnection(constants.MONGO_URL);
  }
};

connectToDatabase();

// when using with docker, at the time we up containers. Mongodb take few seconds to starting, during that time NodeJS server will try to connect MongoDB until success.
mongoose.connection
  .once("open", () => console.log("Connected to database"))
  .on("error", (exception) => {
    console.error(
      "Failed to connect to mongo on startup - retrying in 5 sec",
      exception
    );
    setTimeout(connectToDatabase, 5000);
  });
