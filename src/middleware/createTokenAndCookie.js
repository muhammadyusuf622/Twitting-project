import dotenvConfig from "../config/dotenv.config.js";
import jwt from "jsonwebtoken";

const createTokenAndSetCookie = (user, res) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    dotenvConfig.secretTokenKey,
    { expiresIn: dotenvConfig.sekretTokenTime, algorithm: "HS256" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
};


export default createTokenAndSetCookie;