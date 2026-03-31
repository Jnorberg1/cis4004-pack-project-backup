import mongoose from "mongoose";

const raritySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    weight: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Rarity", raritySchema);