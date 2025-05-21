import { Router } from "express";
import commentController from "../controller/comment.controller.js";


const commentRouter = Router()


commentRouter.post("/", commentController.addComment);

export default commentRouter;