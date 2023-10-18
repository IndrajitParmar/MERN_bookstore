import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoute from "./route/book.route.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use(cors());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3001");
});

app.use("/api", bookRoute);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const msg = err.message || "Internal server error";
  return res.status(status).json({
    success: false,
    statusCode: status,
    message: msg,
  });
});
