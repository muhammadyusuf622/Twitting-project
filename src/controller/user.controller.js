import { hash } from "bcrypt";
import blogModel from "../models/blog.model.js";
import userModel from "../models/user.model.js";
import likeModel from "../models/like.model.js";
import sendMail from "../utils/mail.utils.js";
import crypto from "node:crypto";
import savedModel from "../models/saved.model.js";

const profilePage = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({ user_id: req.user.id })
      .sort({ createdAt: -1 });

    const user = await userModel.findById(req.user.id);

    const profileImageUrl =
      user.imageUrl ||
      "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg";

    res.render("profile", {
      username: user.username,
      email: user.email,
      countPosts: blogs.length,
      createdAt: user.createdAt.toLocaleDateString().split("/")[2],
      profileImageUrl,
      blogs,
    });
  } catch (error) {
    res.clearCookie("token");
    res.redirect("/login");
  }
};

const logout = (_, res) => {
  res.clearCookie("token");
  res.redirect("/register/login2");
};

const deleteacc = async (req, res) => {
  try {
    const userId = req.user.id;

    await userModel.findByIdAndDelete(userId);

    await blogModel.deleteMany({ user_id: userId });

    await likeModel.deleteMany({ userId: userId });

    await savedModel.deleteMany({ userId: userId });

    res.clearCookie("token");
    res.redirect("/register/login2");
  } catch (error) {
    console.log(error.message);
    return res.render("error", {
      status: 500,
      message: "Interval server error!",
    });
  }
};

const forgotPasswordPage = (_, res, next) => {
  try {
    res.render("forgot-password", { message: null });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.render("error", { status: 404, message: "User not found" });
    }
    const resetToken = crypto.randomBytes(50).toString("hex");
    findUser.resettoken = resetToken;
    await findUser.save();
    await sendMail({
      to: email,
      subject: "Reset Password",
      html: `
      <h2> Click here</h2>
      <a href="http://localhost:3000/profile/reset-password?resettoken=${resetToken}">Reset Password</a>
      `,
    });
    res.render("forgot-password", {
      message: "The link sended to your email",
    });
  } catch (error) {
    next(error);
  }
};

const resetPasswordPage = (req, res, next) => {
  try {
    const { resettoken } = req.query;
    res.render("reset-password", {
      message: "Enter new password",
      register_link: "#",
      resettoken,
      text_link: "",
    });
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const { resettoken } = req.query;

    if (newPassword.length < 4) {
      return res.render("reset-password", {
        message: "Password must be at least 4 characters",
        register_link: "/",
        resettoken,
        text_link: "", 
      });
    }

    if (!resettoken) {
      return res.redirect("/register/login2");
    }
    const user = await userModel.findOne({ resettoken });

    if (!user) {
      return res.render("reset-password", {
        message: "Email or passsword not found!",
        register_link: "#",
        resettoken: null,
      });
    }
    const hashPassword = await hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();
    res.render("reset-password", {
      message: "Password updated",
      register_link: "/register/login2",
      resettoken: null,
      text_link: "Go to login page",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  profilePage,
  logout,
  deleteacc,
  forgotPasswordPage,
  forgotPassword,
  resetPasswordPage,
  resetPassword,
};
