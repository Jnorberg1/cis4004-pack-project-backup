import CollectionEntry from "../models/CollectionEntry.js";

export const getMyCollection = async (req, res) => {
  try {
    const items = await CollectionEntry.find({ user: req.user.id })
      .populate({
        path: "shirt",
        populate: ["rarity", "categories"],
      })
      .populate("pack")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
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
    res.status(500).json({ message: error.message });
  }
};