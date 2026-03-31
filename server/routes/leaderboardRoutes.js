import express from "express";
import CollectionEntry from "../models/CollectionEntry.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const leaderboard = await CollectionEntry.aggregate([
      {
        $group: {
          _id: "$shirt",
          pullCount: { $sum: 1 },
        },
      },
      { $sort: { pullCount: -1 } },
      { $limit: 10 },
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;