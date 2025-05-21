import dotenvConfig from "./dotenv.config.js";

export const APP_PORT = parseInt(dotenvConfig.serverPort, 10) || 5000;
