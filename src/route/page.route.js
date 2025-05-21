import { Router } from "express";

const pageRouter = Router();

pageRouter.get("/profile/forgot-password", (req, res) => {
  res.render("forgot-password", { error: null, message: null });
});

pageRouter.get("/profile/reset-password", (req, res) => {
  const { token } = req.query;
  res.render("reset-password", { error: null, message: null, token });
});

export default pageRouter;
