import express, { Request, Response, Application } from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

// prevent env var on production
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

// Initialise passport
require("./services/passport");

const app: Application = express();
const port: number  = +(process.env.PORT || 3000);
const db: string = process.env.DB_URL || "mongodb://localhost:27017/circle";

// Db Setting
mongoose.connect(db , { useNewUrlParser: true });


const server = app.listen(port, (): void => {
    console.log(`Listenning on ${port}`);
});

export default server;

