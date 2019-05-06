import * as filestack from 'filestack-js';

let client: any;
if(process.env.FILESTACK_API_KEY) {
    client  = filestack.init(process.env.FILESTACK_API_KEY);
}else{
    console.error("No FILESTACK API KEY");
}

export default client;
