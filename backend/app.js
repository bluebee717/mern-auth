import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

import { envConfig } from "./config/envConfig.js";
import { connectDB } from "./database/connectDB.js";
import authRouter from "./routes/authRoute.js";

const app = express();
const port = envConfig.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin: envConfig.FRONTEND_BASE_URL,
  credentials: true,
}));

app.use("/api/auth", authRouter);

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
  });
};

startServer();


// TODO: Add data validation like email format, password strength etc.
