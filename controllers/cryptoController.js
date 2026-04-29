import Crypto from "../models/Crypto.js";

export const getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopGainers = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ change24h: -1 });
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    const crypto = await Crypto.create({
      name,
      symbol,
      price,
      image,
      change24h
    });

    res.status(201).json({
      message: "Crypto added successfully",
      crypto
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};