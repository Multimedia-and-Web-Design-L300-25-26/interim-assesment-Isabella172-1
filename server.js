import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";





dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // frontend
  credentials: true
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/crypto", cryptoRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Connect DB (optional) and start server
const startServer = () => {
  app.listen(5000, () => console.log("Server running on port 5000"));
};

connectDB().finally(() => {
  startServer();
});