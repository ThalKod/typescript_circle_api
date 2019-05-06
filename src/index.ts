import express, { Application } from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

// prevent env var on production
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

import auth from "./routes/auth";
import user from "./routes/user";
import upload from "./routes/upload";
import check from "./routes/check";
import video from "./routes/video";
import comment from "./routes/comment";

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
    app.use(process.env.API_BASE_URL, video);
    app.use(process.env.API_BASE_URL, comment);
}

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../build")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    })
}

const server = app.listen(port, (): void => {
    console.log(`Listenning on ${port}`);
});

export default server;

