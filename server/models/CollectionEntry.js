import mongoose from "mongoose";

const collectionEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shirt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shirt",
      required: true,
    },
    pack: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pack",
      default: null,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CollectionEntry", collectionEntrySchema);