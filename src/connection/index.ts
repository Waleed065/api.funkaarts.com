import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import firebaseAdmin from "firebase-admin";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import socketAuthMiddleware from "../middlewares/socketAuthMiddleware";


dotenv.config({path: __dirname + '/../../.env'});
/* --------------------------------- */

export const app = express();
export const io = new Server();

/* --------------------------------- */

const whiteList = [
  "http://localhost:3000",
  "https://example.com",
];
const corsOptions = {
  origin: whiteList,
  optionsSuccessStatus: 200,
};

/* --------------------------------- */
const server = createServer(app);

io.attach(server, {
  cors: corsOptions
});

io.use(socketAuthMiddleware)

app.use(cors(corsOptions));
app.use(express.json());

const port = 8000;
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require("../../admin-sdk.json")),
  storageBucket: "gs://...."
});

mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.DB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    server.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => console.log(err));
