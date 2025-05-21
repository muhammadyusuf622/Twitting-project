import { config } from "dotenv";
import nodemailer from "nodemailer";
import dotenvConfig from "./dotenv.config.js";
config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: dotenvConfig.SMTP_USER,
    pass: dotenvConfig.SMTP_PASS,
  },
});

export default transporter;