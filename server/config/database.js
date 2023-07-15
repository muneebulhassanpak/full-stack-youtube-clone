import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DATABASE_URL } = process.env;

const databaseConnection = async () => {
  try {
    console.log(DATABASE_URL);
    await mongoose.connect(DATABASE_URL);
  } catch (err) {
    console.log(err);
  }
};

export default databaseConnection;
