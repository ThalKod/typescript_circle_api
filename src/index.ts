import express, { Request, Response, Application } from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import auth from "./routes/auth";
import user from "./routes/user";
import upload from "./routes/upload";
import check from "./routes/check";

// prevent env var on production
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

// Initialise passport
require("./services/passport");

const app: Application = express();
const port: number  = +(process.env.PORT || 3080);

// App Setting
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*"}));
app.use(cors());

// Db Setting
if(process.env.DB_URL)
    mongoose.connect(process.env.DB_URL , { useNewUrlParser: true });

// Api Routes
if(process.env.API_BASE_URL){
    app.use(process.env.API_BASE_URL, auth);
    app.use(process.env.API_BASE_URL, user);
    app.use(process.env.API_BASE_URL, upload);
    app.use(process.env.API_BASE_URL, check);
}

const server = app.listen(port, (): void => {
    console.log(`Listenning on ${port}`);
});

export default server;

