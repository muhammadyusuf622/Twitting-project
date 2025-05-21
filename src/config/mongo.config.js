import mongoose from "mongoose";
import dotenvConfig from "./dotenv.config.js";

const connectDb = async () => {
  try {
    await mongoose.connect(dotenvConfig.mongodbUrl);
    return `✅`;
  } catch (error) {
    console.log(error.message);
    throw new Error(`❌`);
  }
};

export default connectDb;
