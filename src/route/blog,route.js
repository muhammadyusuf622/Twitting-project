import express from "express";
import multer from "multer";
import path from "path";
import blogController from "../controller/blog.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const blogRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const name = path.parse(file.originalname).name;
        const ext = path.extname(file.originalname);
        const safeName = name.replace(/[^a-z0-9_-]/gi, "_");
        cb(null, Date.now() + "-" + safeName + ext);
    }
    
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mkv|avi|mov/i;
    const allowedMimes = [
        "image/apng",
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "video/x-matroska",
        "video/x-msvideo",
        "video/quicktime",
    ];
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedMimes.includes(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Faqat rasm va video yuklash mumkin!"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 200 * 1024 * 1024 } // Maksimal hajm: 200MB
});

blogRouter.get("/", blogController.showAddBlogForm);

blogRouter.post("/", authMiddleware, upload.single("media"), blogController.addBlog);


export default blogRouter;
