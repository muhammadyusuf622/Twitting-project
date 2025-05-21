import { config } from "dotenv";
import transporter from "../config/mail.config.js";
import ErrorHandler from "./ErrorHandler.js";

config();
 const sendMail = async ({ to, subject, text = "", html = "" }) => {
  try {
    const mail = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html, 
    });

    return mail.messageId;
  } catch (error) {
    console.log("Email yuborishda xatolik:", error.message);
    throw new ErrorHandler(500, "Email yuborishda xatolik");
  }
};

export default sendMail;