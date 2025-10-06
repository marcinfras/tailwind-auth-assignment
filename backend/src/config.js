import dotenv from "dotenv";

dotenv.config();

const AppConfig = {
  PORT: process.env.PORT || 3000,
  MONGO_URI:
    process.env.MONGO_URI ??
    (() => {
      throw new Error("MONGODB_URI is not defined in environment variables");
    })(),
  JWT_SECRET:
    process.env.JWT_SECRET ??
    (() => {
      throw new Error("JWT_SECRET is not defined in environment variables");
    })(),
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
};

export default AppConfig;
