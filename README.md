<p align="center">
  <img width="260" height="150" src="https://github.com/ThalKod/react_video_sharing/blob/master/src/assets/images/logo.svg">
 <h1 align="center">Circle - Typescript API</h1>

 <p align="center">
 <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg"/></a>
 </p>
 
 This is the Typescript version of the API of circle, you can check the React client [Here](https://github.com/ThalKod/react_video_sharing)
</p>

## Built With:
* [Typescript](https://www.typescriptlang.org/) - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
* [Node Js](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.

## Documentation
* [Requirements](#requirements) 
* [Installation](#installation)
* [Contribution](#contribution)
* [License](#license)


## Requirements
* [ffmpeg](https://ffmpeg.org/) - FFmpeg is a collection of libraries and tools to process multimedia content such as audio, video, subtitles and related metadata.
* [A Subscrition to FIlestack API](https://www.filestack.com/) - The File Handling Service for Developers
* [MongoDB](https://www.mongodb.com/) - Database Solution

## Installation

clone the repo
```bash
 $ git clone https://github.com/ThalKod/typescript_circle_api.git
```

create a .env file at the src/ of your project: 
```js
#JWT
JWT_SECRET = YOUR_JWT_KEY
JWT_REFRESH_TOKEN_SECRET = YOUR_REFRESH_JWT_KEY

#Database
DB_URL = DATABASE_URL

#Filestack
FILESTACK_API_KEY= YOUR_FILESTACK_API


#API
API_BASE_URL = /api/v0
```
Install and run the api
```bash
 $ yarn install
 $ yarn start:dev
```
API running on localhost:3080

## Contribution

Feel Free to contribute, PR are the most welcome :).

## License
MIT License

Copyright (c) 2019 Thal Marcelin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
