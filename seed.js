import mongoose from "mongoose";
import dotenv from "dotenv";
import Crypto from "./models/Crypto.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedCryptos = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");

    // Clear existing cryptos
    const deleteResult = await Crypto.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing cryptos`);

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

    const result = await Crypto.insertMany(cryptos);
    console.log(`✅ ${result.length} cryptocurrencies seeded successfully!`);
    console.log("📊 Seeded cryptos:", result.map(c => c.name));
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding cryptos:", error.message);
    process.exit(1);
  }
};

seedCryptos();
