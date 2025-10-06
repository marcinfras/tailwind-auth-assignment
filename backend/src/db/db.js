import mongoose from "mongoose";
import Config from "../config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(Config.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};
