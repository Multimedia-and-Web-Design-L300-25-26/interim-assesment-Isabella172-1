import express from "express";
import { getProfile, verifyAuth } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.get("/verify-auth", protect, verifyAuth);

export default router;