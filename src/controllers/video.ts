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

export const getVideos = async (req: Request, res: Response) => {
    const { limit, offset } = req.query;

    Video.find()
        .sort({ createdAt: -1 })
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .then((rVideos: IVideo[]) => res.send({ error: false, videos: rVideos}))
        .catch(err => res.send({ error: true, msg: err }));
};

export const getVideosListByUserId = (req:Request, res:Response) => {
    const { id } = req.params;
    const { limit, offset } = req.query;

    if(!id || !limit || !offset) return res.send({ error: true, msg: "Please provide the correct params"});

    Video.find({ author: id})
        .sort({ createdAt: -1 })
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .then((videos: IVideo[]) => res.send({ error:false,  videos }))
        .catch(err => res.send({ error: false, msg: err}));
};

export const getSimilarVideosById = (req:Request, res:Response) => {
    const { id } = req.params;
    if(!id) return res.send({ error: true, msg: "Please provide a video id"});

    Video.findById(id)
        .then((video: IVideo | null) => {
            if(!video) return res.send({ error: true, msg: "Video Not Found"});
            const tags: {}[] = video.tags.map(({ text }) => text);
            Video.find({ "tags.text": {"$in": [ ...tags]}, _id: {"$ne": video.id}})
                .then((rVideo: IVideo[]) => res.send({ error: false, videos: rVideo}))
                .catch(err => res.send({ error: true, msg: err}));
        })
        .catch(err => res.send({ error: true, msg: err}));
};

export const getVideoById = (req:Request, res:Response) => {
    const { id } = req.params;

    Video.findById(id)
        .then((video: IVideo | null) => {
            if(!video) return res.send({ error: true, msg: "Video Not Found"});
            res.send({ error: false, video });
        })
        .catch(err => res.send({ error: true, msg: err}));
};

export const searchVideosByText = (req:Request, res:Response) => {
    const { query } = req.body;
    const { limit, offset } = req.query;

    if(!limit || !offset) return res.send({ error: true, msg: "Please provide the correct params"});

    Video.find({$text: {$search: query}})
        .sort({ createdAt: -1 })
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .then((rVideos: IVideo[]) => {
            if(rVideos.length <= 0)
                return res.send({ error: false, videos: { found: false, videos: rVideos }});

            return res.send({ error: false, videos: {found: true, videos: rVideos }});
        })
        .catch(err => res.send({ error: true, msg: err}));
};

