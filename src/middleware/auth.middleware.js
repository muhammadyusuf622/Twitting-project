import jwt from "jsonwebtoken";
import dotenvConfig from "../config/dotenv.config.js";

const SECRET_KEY = dotenvConfig.secretTokenKey;

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers["authorization"];

    if (!token) {
        return res.redirect("/register/2");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.redirect("/register/2");
    }
};
