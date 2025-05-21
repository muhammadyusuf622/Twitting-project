import { Router } from "express";
import registerController from "../controller/register.controller.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { userregisterSchema, usersiginSchema } from "../Schems/user.schema.js";

const registerRouter = Router();

registerRouter.post(
  "/",
  validationMiddleware(userregisterSchema),
  registerController.register
);
registerRouter
  .post(
    "/login",
    validationMiddleware(usersiginSchema),
    registerController.login
  )
  .get("/2", registerController.registerpage)
  .get("/login2", registerController.loginpage);
export default registerRouter;
