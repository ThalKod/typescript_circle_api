import { Response, Request} from "express";

import { Video, IVideo } from "../models/Video";
import processVideo from "../utils/videos";

export const saveVideo = (req: Request, res: Response) => {
    const video: IVideo = req.body;
    video.author = req.user.id;

    // Getting video duration and a default cover photo
    processVideo(video)
        .then((result) => {
            const { duration, pathToScreenshot } = result;
            if(duration && pathToScreenshot){
                console.log(duration, pathToScreenshot);
                video.duration = duration;
                video.defaultCoverPhoto = pathToScreenshot;

                Video.create(video)
                    .then((rVideo) => res.send({error: false, id: rVideo.id}))
                    .catch(err => res.send({error: true, msg: err }));
            }
        })
        .catch(err => res.send({ error: true, msg: err}));
};
