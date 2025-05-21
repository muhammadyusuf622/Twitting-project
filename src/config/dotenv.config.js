import { config } from "dotenv";


config()

export default {
  serverPort: process.env.APP_PORT,
  mongodbUrl: process.env.MONGO_URL,
  secretTokenKey: process.env.SECRET_TOKEN_KEY,
  sekretTokenTime: process.env.SECRET_TOKEN_TIME,
  NODE_ENV: process.env.NODE_ENV,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS
}