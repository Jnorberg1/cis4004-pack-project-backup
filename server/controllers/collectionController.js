import CollectionEntry from "../models/CollectionEntry.js";
import "../models/Rarity.js";
import "../models/Category.js";

export const getMyCollection = async (req, res) => {
  try {
    const items = await CollectionEntry.find({ user: req.user.id })
      .populate({
        path: "shirt",
        populate: [
          { path: "rarity" },
          { path: "categories" },
        ],
      })
      .populate("pack")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error("Collection fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const item = await CollectionEntry.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!item) {
      return res.status(404).json({ message: "Collection item not found" });
    }

    item.isFavorite = !item.isFavorite;
    await item.save();

    res.json(item);
  } catch (error) {
    console.error("Favorite toggle error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCollectionItem = async (req, res) => {
  try {
    const item = await CollectionEntry.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!item) {
      return res.status(404).json({ message: "Collection item not found" });
    }

    res.json({ message: "Collection item deleted" });
  } catch (error) {
    console.error("Delete collection item error:", error);
    res.status(500).json({ message: error.message });
  }
};