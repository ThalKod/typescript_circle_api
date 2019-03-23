import express, { Request, Response, Application } from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

import auth from "./routes/auth";
import user from "./routes/user";
import upload from "./routes/upload";

// prevent env var on production
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

// Initialise passport
require("./services/passport");

const app: Application = express();
const port: number  = +(process.env.PORT || 3080);
const db: string = process.env.DB_URL || "mongodb://localhost:27017/circle";

// App Setting
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*"}));
app.use(cors());

// Db Setting
mongoose.connect(db , { useNewUrlParser: true });

// Api Routes
if(process.env.API_BASE_URL){
    app.use(process.env.API_BASE_URL, auth);
    app.use(process.env.API_BASE_URL, user);
    app.use(process.env.API_BASE_URL, upload);
}

const server = app.listen(port, (): void => {
    console.log(`Listenning on ${port}`);
});

export default server;

