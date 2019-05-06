import filestackClient from "../services/filestack";
const fs = require('fs');

const removeFile = (path: string) => {
  fs.unlink(path, (err: Error) => {
    if(err) console.log("Error While deleting file at :", path);
  })
};

export const uploadFilesFromFS = (filePath: string) => {
  return new Promise((resolve, reject) => {
    filestackClient.upload(filePath)
        .then((res: { url: string }) => {
          resolve(res.url);
          removeFile(filePath); // no longer need the file
        })
        .catch((err: Error) => {
          reject(err);
        })
  })
};
