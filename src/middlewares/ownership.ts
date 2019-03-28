import { Request, Response, NextFunction} from "express";

import { Video, IVideo } from "../models/Video";

export const isVideoOwner = (req:Request, res:Response, next:NextFunction) => {
    Video.findById(req.params.id)
        .then((rVideo: IVideo | null) => {
            if(!rVideo) return res.send({ error: true, msg: "No video"});
            if(rVideo.author.equals(req.user.id)) next();
        })
        .catch(err => {
            res.send({ error: true, msg: err});
        })
};
