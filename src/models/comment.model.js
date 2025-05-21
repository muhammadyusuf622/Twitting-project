import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({

  comment: {
    type: mongoose.SchemaTypes.String,
    required: true
  },

  blogId: {
    ref: "Blog",
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },

}, {
  timestamps: true,
  collection: "comments",
  versionKey: false
});

export default mongoose.model("Comments", CommentSchema);