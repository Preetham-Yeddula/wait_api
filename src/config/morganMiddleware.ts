import morgan, { StreamOptions } from "morgan";
import * as os from 'os';

import { FluentClient } from '@fluent-org/logger';

import Logger from "../lib/logger";

 const host = os.hostname();
 const logger = new FluentClient("fluentd.test",{
   socket:{
     host: "52.140.66.173",
     port: 24224,
     timeout: 3000
   }
 })


// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  //write: (message) => Logger.http(message),
   write: (message) => logger.emit(host,{"req": message})
};

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
  ":remote-addr - :remote-user :method :url :status :res[content-length] - :response-time ms HTTP/:http-version" ,
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

export default morganMiddleware;