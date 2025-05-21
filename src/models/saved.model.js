import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Blog",
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "saved-videos",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Saved", savedSchema);
