import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Blog",
    required: true
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },

}, {
  collection: "likes",
  timestamps: true,
  versionKey: false
});

export default mongoose.model("Like", likeSchema);