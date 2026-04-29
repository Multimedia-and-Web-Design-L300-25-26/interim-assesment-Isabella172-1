import express from "express";
import {
  getAllCrypto,
  getTopGainers,
  getNewCrypto,
  createCrypto
} from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/", getAllCrypto);
router.get("/gainers", getTopGainers);
router.get("/new", getNewCrypto);
router.post("/", createCrypto);

export default router;