import { Router } from "express";
import savedController from "../controller/saved.controller.js";

const savedRouter = Router();

savedRouter
  .post("/", savedController.addSaved)
  .delete("/", savedController.deleteSaved);

export default savedRouter
