import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getMyCollection,
  toggleFavorite,
  deleteCollectionItem,
} from "../controllers/collectionController.js";

const router = express.Router();

router.get("/", authMiddleware, getMyCollection);
router.put("/favorite/:id", authMiddleware, toggleFavorite);
router.delete("/:id", authMiddleware, deleteCollectionItem);

export default router;