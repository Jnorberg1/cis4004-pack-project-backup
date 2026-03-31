import mongoose from "mongoose";

const packOpeningHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pack: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pack",
      required: true,
    },
    results: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shirt",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("PackOpeningHistory", packOpeningHistorySchema);