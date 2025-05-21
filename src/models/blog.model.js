import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    collection: "blogs",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Blog", BlogSchema);
