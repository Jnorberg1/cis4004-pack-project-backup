import mongoose from "mongoose";

const packSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    shirtPool: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shirt",
      },
    ],
    cardsPerPack: { type: Number, default: 3 },
  },
  { timestamps: true }
);

export default mongoose.model("Pack", packSchema);