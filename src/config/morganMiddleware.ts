import morgan, { StreamOptions } from "morgan";
import * as os from 'os';
import express,{Application} from 'express';
import { FluentClient } from '@fluent-org/logger';
import { Request, Response } from "express";

let app:Application = express();

import Logger from "../lib/logger";

 const host = os.hostname();
 const logger = new FluentClient("fluentd.test",{
   socket:{
     host: "52.140.66.173",
     port: 24224,
     timeout: 3000
   }
 })

morgan.token('host_name',function getHost():any{
        return host;
})

morgan.token('origin_ip',function getOri(req:Request,res:Response):any{
  return req.hostname;
})


// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => emitter_elas(message),
   //write: (message) => logger.emit(host,{"req": message})
};

function emitter_elas(message:String):void{
        const mess_array = message.split(" ");

        const req_host:string = mess_array[0];
        const req_origin:string = mess_array[1];
        const host_details:string = mess_array[2];
        const method_type : string = mess_array[3];
        const url : string = mess_array[4];
        const res_:string = mess_array[5];
        const time:number = parseInt(mess_array[6])
        console.log(req_host+" "+req_origin+" "+host_details+" "+method_type+" "+url+" "+res_+" "+time)
        logger.emit("follow",{"req_host":req_host,"req_origin":req_origin,"req_url":url,"method":method_type,"host_details":host_details,"res":res_,"time":time})  

        console.log(typeof(message))
}

// Skip all the Morgan http log if the 
// application is not running in development mode.
// This method is not really needed here since 
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  //":method :url :status :res[content-length] - :response-time ms",
  ":origin_ip :remote-addr :host_name :method :url :status :response-time" ,
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

export default morganMiddleware;