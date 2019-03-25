import ffmpeg from "fluent-ffmpeg";
import path from "path";
import { IVideo } from "../models/Video";

interface result {
    error: boolean,
    duration?: number,
    msg?: string,
    pathToScreenshot?: string
}

type callback = ({}: result) => void;

const getDuration = (url: string, callback: callback) =>{
    ffmpeg.ffprobe(url, (err, metadata) => {
        if(err) return callback({ error: true, msg: err});
        return callback({ error: false, duration: metadata.format.duration });
    });
};

const takeScreenshot = (video: IVideo, duration: number, callback: callback) => {
    const pathToScreenshot = path.join(__dirname, "../data", video.handle);
    let filename: string;
    const proc = ffmpeg(video.url)
        .on('filenames', (filenames) => {
            filename = filenames[0];
            console.log('filename : ' + filenames.join(', '));
        })
        .on('end', () => {
            console.log("Saved !");
            return callback({ error: false, pathToScreenshot: path.join(pathToScreenshot, filename) });
        })
        .on('error', (err) => {
            console.log("Error");
            return callback({ error: true, msg: err});
        })
        .takeScreenshots({ count: 1, timemarks: [ (duration / 4).toString() ], size: '1280x720' }, pathToScreenshot);
};

// process video by taking a getting a video duration and a default screenshot
const processVideo = (video: IVideo) => {
    return new Promise((resolve, reject) => {
        getDuration(video.url, (res: result) => {
            if(res.error) reject(res.msg);
            const duration = res.duration;

            if(duration){
                takeScreenshot(video, duration, (result: result) => {
                    if(result.error) reject(result.msg);
                    const pathToScreenshot = result.pathToScreenshot;
                    resolve({duration, pathToScreenshot});
                })
            }
        })
    })
};

export default processVideo;
