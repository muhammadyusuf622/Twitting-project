import { Router } from "express";
import userController from "../controller/user.controller.js";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware.js";
import checkrole from "../middleware/roles.midleware.js";
import userModel from "../models/user.model.js";
import likedVideosController from "../controller/liked-videos.controller.js";
import savedVideosController from "../controller/saved-videos.controller.js";

const userRoute = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

userRoute.post(
  "/upload",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.render("error", {
          status: "400",
          message: "Image not downloaded",
        });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      const userId = req.user.id;

      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { imageUrl: imageUrl },
        { new: true }
      );

      if (!updatedUser) {
        return res.render("error", { status: 400, message: "User not found" });
      }

      res.redirect("/profile");
    } catch (error) {
      console.error(error);
      res.render("error", { status: 500, message: "Error with server" });
    }
  }
);

userRoute
  .get("/", authMiddleware, checkrole(["USER"]), userController.profilePage)
  .get("/exit", userController.logout)
  .delete("/delete", authMiddleware, userController.deleteacc)
  .get("/liked-videos", authMiddleware, likedVideosController.getAllLikedVideos)
  .get("/saved-videos", authMiddleware, savedVideosController.getAllSavedVideos)
  .post("/forgot-password/forgot", userController.forgotPassword)
  .post("/reset-password/reset", userController.resetPassword)
  .get("/forgot-password", userController.forgotPasswordPage)
  .get("/reset-password", userController.resetPasswordPage);

export default userRoute;
