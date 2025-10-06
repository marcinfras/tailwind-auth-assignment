import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/db.js";
import Config from "./config.js";
import authRoutes from "./routes/auth.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: Config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.listen(Config.PORT, () => {
  console.log(`Server is running on http://localhost:${Config.PORT}`);
});
