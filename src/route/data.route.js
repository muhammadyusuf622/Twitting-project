import { Router } from "express";
import dataController from "../controller/data.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import checkrole from "../middleware/roles.midleware.js";



const dataRouter = Router()

dataRouter.get("/", authMiddleware, checkrole(["USER"]), dataController.getAllData);

export default dataRouter