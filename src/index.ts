import express, { Request, Response, Application } from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

// prevent env var on production
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const app: Application = express();
const port: number  = +(process.env.PORT || 3000);

const server = app.listen(port, (): void => {
    console.log(`Listenning on ${port}`);
});

export default server;

