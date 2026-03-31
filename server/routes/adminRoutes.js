import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import Shirt from "../models/Shirt.js";
import Pack from "../models/Pack.js";

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.post("/shirts", async (req, res) => {
  try {
    const shirt = await Shirt.create(req.body);
    res.status(201).json(shirt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/shirts", async (req, res) => {
  const shirts = await Shirt.find().populate("rarity categories");
  res.json(shirts);
});

router.put("/shirts/:id", async (req, res) => {
  const shirt = await Shirt.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(shirt);
});

router.delete("/shirts/:id", async (req, res) => {
  await Shirt.findByIdAndDelete(req.params.id);
  res.json({ message: "Shirt deleted" });
});

router.post("/packs", async (req, res) => {
  const pack = await Pack.create(req.body);
  res.status(201).json(pack);
});

router.get("/packs", async (req, res) => {
  const packs = await Pack.find().populate("shirtPool");
  res.json(packs);
});

router.put("/packs/:id", async (req, res) => {
  const pack = await Pack.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(pack);
});

router.delete("/packs/:id", async (req, res) => {
  await Pack.findByIdAndDelete(req.params.id);
  res.json({ message: "Pack deleted" });
});

export default router;