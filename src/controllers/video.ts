import fs from "fs";
import { Request, Response } from "express";
import { pick } from "lodash";

import { Video, IVideo } from "../models/Video";

export const getBasicVideoInfoById = (req:Request, res:Response) => {
  Video.findById(req.params.id)
      .then((rVideo: IVideo | null) => {
        if(!rVideo) return res.send({ error: true, msg: "No Video"});
        const video = pick(rVideo, ["name","size","duration"]);
        res.send({error: false, video });
      })
      .catch(err => res.send({ error: true, msg: err}))
};

export const getDefaultImageCoverById = (req:Request, res:Response) => {
    Video.findById(req.params.id)
        .then((rVideo: IVideo | null) => {
            if(!rVideo) return res.send({ error: true, msg: "No Video"});
            fs.readFile(rVideo.defaultCoverPhoto, "base64", (err, base64) => {
                if(err) res.send({ error: true, msg: err });
                const data:string = `data:image/png;base64, ${base64}`;
                res.send({ error: false, coverPhoto: data});
            });
        })
        .catch(err => res.send({ error: true, msg: err}))
};

export const updateVideo = (req:Request, res:Response) => {
    Video.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send({ error: false }) )
        .catch(err => {
            res.send({ error: true, msg: err})
        })
};

export const getRecommended = (req: Request, res: Response) => {
    Video.find()
        .sort({viewCount: -1})
        .limit(8)
        .then((rVideos: IVideo[]) => {
            res.send({error: false, videos: rVideos})
        })
        .catch(err => {
            res.send({error: true, msg: err});
        });
};
