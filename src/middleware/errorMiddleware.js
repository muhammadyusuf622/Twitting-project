import logger from "../config/winston.congif.js";

const errorMiddleware = (err, req, res, next) => {
  logger.error(err)
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error!";

  logger.error(`${req.method} ${req.url}, - ${err.message}`); 
  console.error(`[ERROR] ${statusCode} - ${message}`);
  return;
};


export default errorMiddleware;