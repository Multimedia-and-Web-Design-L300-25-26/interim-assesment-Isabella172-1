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
import Crypto from "./models/Crypto.js";

import "dotenv/config";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // frontend
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

// Seed database if empty
const seedDatabase = async () => {
  try {
    const count = await Crypto.countDocuments();
    if (count === 0) {
      console.log("Database is empty, seeding with initial crypto data...");
      const cryptos = [
        {
          name: "Bitcoin",
          symbol: "BTC",
          price: 43500,
          image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
          change24h: 2.3
        },
        {
          name: "Ethereum",
          symbol: "ETH",
          price: 2450.50,
          image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
          change24h: 3.5
        },
        {
          name: "Litecoin",
          symbol: "LTC",
          price: 180,
          image: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
          change24h: -1.2
        },
        {
          name: "Ripple",
          symbol: "XRP",
          price: 0.52,
          image: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
          change24h: 5.8
        },
        {
          name: "Cardano",
          symbol: "ADA",
          price: 0.95,
          image: "https://cryptologos.cc/logos/cardano-ada-logo.png",
          change24h: 1.5
        },
        {
          name: "Solana",
          symbol: "SOL",
          price: 142,
          image: "https://cryptologos.cc/logos/solana-sol-logo.png",
          change24h: 4.2
        },
        {
          name: "Polkadot",
          symbol: "DOT",
          price: 8.50,
          image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
          change24h: -2.3
        },
        {
          name: "Dogecoin",
          symbol: "DOGE",
          price: 0.18,
          image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
          change24h: 6.5
        }
      ];
      await Crypto.insertMany(cryptos);
      console.log("Database seeded with 8 cryptocurrencies!");
    }
  } catch (error) {
    console.error("Error seeding database:", error.message);
  }
};

// Connect DB (optional) and start server
const startServer = async () => {
  await seedDatabase();
  app.listen(5000, () => console.log("Server running on port 5000"));
};

connectDB().finally(() => {
  startServer();
});