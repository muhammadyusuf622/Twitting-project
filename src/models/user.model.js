import mongoose from "mongoose";
import { type } from "node:os";
// JS
const userSchema = mongoose.Schema(
  {
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    token: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    imageUrl: {
      type: mongoose.SchemaTypes.String,
      default:
        "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
    },
    role: {
      type: mongoose.SchemaTypes.String,
      enum: ["USER", "ADMIN", "OWNER"],
      default: "USER",
    },
    resettoken: {
      type: mongoose.SchemaTypes.String,
    },
  },
  {
    collection: "users",
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("User", userSchema);
