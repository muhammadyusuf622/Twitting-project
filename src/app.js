import express from "express";
import errorMiddleware from "./middleware/errorMiddleware.js";
import router from "./route/index.js";
import cookieParser from "cookie-parser";
import path from "path";
import pageRouter from "./route/page.route.js";
import methodOverride from "method-override"
import morgan from "morgan";
import cors from "cors"
import { Server } from "socket.io";
import http from "http"
import commentController from "./controller/comment.controller.js";
const app = express();

app.use(methodOverride("_method"));


// if(process.env.NODE_ENV?.trim() === "develop"){
//   app.use(morgan("tiny"));
// }

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.redirect("/register/login2");
});

app.use("/", router);
app.use("/", pageRouter);

app.use((req, res, next) => {
  res.status(404).render("error", { status: 404, message: "Page not found" });
});

app.use(errorMiddleware);

const server = http.createServer(app)

const io = new Server(server, {
  cors: {origin: '*'},
});

io.on('connection', ( socket ) => {
  
  socket.on("message", async data => {
    let res = await commentController.setComment(data)
    socket.emit("responsComment", res)
  })
})



export default server;
