import { Router } from "express";
import videoController from "../controller/video.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import checkrole from "../middleware/roles.midleware.js";


const videoRouter = Router();


videoRouter.get("/", authMiddleware, checkrole(["USER"]),  videoController.getAllvideos);

export default videoRouter;
