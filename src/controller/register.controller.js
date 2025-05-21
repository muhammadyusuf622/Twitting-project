import userModel from "../models/user.model.js";
import { hash, compare } from "bcrypt";
import createTokenAndSetCookie from "../middleware/createTokenAndCookie.js";
import sendMail from "../utils/mail.utils.js";
import crypto from "crypto"

const register = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      return res.redirect("/home");
    }

    const { username, email, password, confirm_password } = req.body;

    if (!password || !confirm_password) {
      return res.render("error", {
        status: 400,
        message: "Password and confirm password are required",
      });
    }

    if (password !== confirm_password) {
      return res.render("error", {
        status: 409,
        message: "Passwords do not match",
      });
    }

    const foundUsername = await userModel.findOne({ username });
    if (foundUsername) {
      return res.render("error", {
        status: 400,
        message: `Username ${username} already exists`,
      });
    }

    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return res.render("error", {
        status: 409,
        message: "User already exists",
      });
    }

    const passwordHash = await hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: passwordHash,
    });

    createTokenAndSetCookie(newUser, res);

    await sendMail({
      to: email,
      subject: "Welcome Twitting",
      text: "You have successfully passed our tweeting blog",
      html: `<p>You have successfully passed our tweeting blog</p>`,
    });

    res.redirect(`/home`);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.render("error",   {status: 404, message: "User not found" });
    }
    const isMatch = await compare(password, findUser.password);
    if (!isMatch) {
      return res.render("error", {
        status: 400,
        message: "Incorrect password",
      });
    }

    createTokenAndSetCookie(findUser, res);
    res.redirect(`/home`);
  } catch (error) {
    next(error);
  }
};

const registerpage = (req, res, next) => {
  try {
    if (req.cookies.token) {
      return res.redirect("/home");
    }
    res.render("register");
  } catch (error) {
    next(error);
  }
};

const loginpage = (req, res, next) => {
  try {
    if (req.cookies.token) {
      return res.redirect("/home");
    }
    res.render("login");
  } catch (error) {
    next(error);
  }
};
// const forgotPasswordPage = (_,res,next) => {
//   try {
//     res.render("forgot-password", {message: null});
//   } catch (error) {
//     next(error);
//   }
// }
// const forgotPassword = async (req,res,next) => {
//   try {
//     const { email } = req.body;
//     const findUser = await userModel.findOne({ email });
//     if (!findUser) {
//       return res.render("error", { status: 404, message: "User not found" });
//     }
//     const resetToken = crypto.randomBytes(50).toString("hex");
//     findUser.resettoken = resetToken;
//     await findUser.save();
//     await sendMail({
//       to: email, 
//       subject: "Reset Password", 
//       html: `
//       <h2> Quydagi link bosing</h2>
//       <a href="http://localhost:3000/register/reset-password?resettoken=${resetToken}">Reset Password</a>
//       `,
//     });
//     res.render("forgot-password",{message:"email silka yuborildi ushani oching"});
//   } catch (error) {
//     next(error);
//   }
// }
// const resetPasswordPage = (req,res,next) => {
//   try {
//     const { resettoken } = req.query;
//     res.render("reset-password", {message: "yangi parol yozing",register_link: "#",resettoken,text_link: ""});
//   } catch (error) {
//     next(error); 
//   }
// }
// const resetPassword = async (req,res,next) => {
//   try {
//     const { newPassword } = req.body;
//     const { resettoken } = req.query;
    
//     if(!resettoken) {
//       return res.redirect("/register/login2");
//     }
//     const user = await userModel.findOne({resettoken});
    
//     if(!user) {
//       return res.render("reset-password", {message: "email paroli notog'ri yoki yoq",register_link:"#",resettoken:null});
//     }
//     const hashPassword = await hash(newPassword,10);
//     user.password = hashPassword;
//     await user.save();
//     res.render("reset-password", {
//       message:"parol yangilandi!",
//       register_link: "/register/login2",
//       resettoken:null,
//       text_link: "login qaytib qayta kirish"
//     });
//   } catch (error) {
//     next(error);
//   }
// }
export default { register, login, loginpage, registerpage, };