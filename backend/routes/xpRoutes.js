import express from "express";
import { addXP } from "../controllers/xpController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add", protect, addXP);

export default router;