import { Router } from "express";
import dataRouter from "./data.route.js";
import blogRouter from "./blog,route.js";
import userRoute from "./user.route.js";
import registerRouter from "./register.route.js";
import likeRouter from "./like.route.js";
import commentRouter from "./comment.route.js";
import videoRouter from "./video.router.js";
import savedRouter from "./saved.route.js";

const router = Router();

router.use("/home", dataRouter);

router.use("/blogs", blogRouter);

router.use("/register", registerRouter)

router.use("/profile", userRoute)

router.use("/comment", commentRouter)

router.use("/like", likeRouter)

router.use("/short", videoRouter)
router.use("/save",savedRouter )


export default router;
