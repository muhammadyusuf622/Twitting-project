import { Router } from "express";
import likeController from "../controller/like.controller.js";


const likeRouter = Router()


likeRouter.post("/", likeController.addLike)
.delete("/", likeController.deleteLike)

export default likeRouter