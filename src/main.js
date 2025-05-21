import server from "./app.js";
import { APP_PORT } from "./config/app.config.js";
import connectDb from "./config/mongo.config.js";
import logger from "./config/winston.congif.js";
import checkDisk from "./utils/checkDiskSpace.utils.js";

await connectDb()
  .then((data) => console.log(data))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

  setInterval(() => {
    checkDisk()
  }, 10 * 60 * 1000);

  
let serverCeck = server.listen(APP_PORT, () => {
  logger.info(`The Server ${APP_PORT} - started on port 300`);
  console.log(`http://localhost:${APP_PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("unhandledRejection", reason);

  serverCeck.closeAllConnections();
  serverCeck.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});
