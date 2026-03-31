import express from "express";
import { getAllPacks, openPack } from "../controllers/packController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllPacks);
router.post("/open/:packId", authMiddleware, openPack);

export default router;