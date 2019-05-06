import { Response, Request} from "express";

import { Video, IVideo } from "../models/Video";
import processVideo from "../utils/videos";
import { uploadFilesFromFS } from "../utils/filestack";

export const saveVideo = (req: Request, res: Response) => {
    const video: IVideo = req.body;
    video.author = req.user.id;

    // Getting video duration and a default cover photo
    processVideo(video)
        .then((result) => {
            if(result.pathToScreenshot){
                uploadFilesFromFS(result.pathToScreenshot)
                    .then((url) => {
                        const { duration, pathToScreenshot } = result;
                        if(duration && pathToScreenshot){
                            video.duration = duration;
                            // @ts-ignore
                            video.defaultCoverPhoto = url;

                            Video.create(video)
                                .then((rVideo) => res.send({error: false, id: rVideo.id}))
                                .catch(err => res.send({error: true, msg: err }));
                        }
                    })
            }
        })
        .catch(err => res.send({ error: true, msg: err}));
};
