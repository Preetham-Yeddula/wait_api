import { Request, Response } from "express";
import bodyParser from "body-parser";
import Logger from "../lib/logger";
import PayModel from "../model/model";
import { FluentClient } from '@fluent-org/logger'
import * as os from 'os';
import random from 'random';
const { Client } = require('@elastic/elasticsearch')

const logger = new FluentClient("fluentd.test",{
    socket:{
      host: "52.140.66.173",
      port: 24224,
      timeout: 3000
    }
  })

const hostname:string = os.hostname();

export let getTest = (req:Request,res:Response)=> {
        let api_name:string = "/getAll";
        Logger.debug("Triggered API -->"+api_name);
        Logger.debug("Request IP -->"+req.socket.remoteAddress+" Request Host -->"+req.hostname)
        //logger.emit("follow",{"req_type":req.method})
        logger.emit("follow",{"req_host":req.hostname,"req_origin":req.socket.remoteAddress,"req_url":req.url,"method":req.method,"host_details":os.hostname(),"res":res.statusCode})
        console.log(api_name+" triggered")

        PayModel.find({},(err:any,doc:any)=>{
           if(!err){
               res.send(doc);
           }else {
               throw err;           // throw the error to view.
           }
    })
}


export let postPos = (req:Request,res:Response)=> {
    let project = req.body;
    let p1 = new PayModel(project); // created reference using json body with Interface verification 
    logger.emit("follow",{"req_host":req.hostname,"req_origin":req.socket.remoteAddress,"req_url":req.url,"method":req.method,"host_details":os.hostname(),"res":res.statusCode})
    
    Logger.debug("This is a debug log postPos"+"\n");

    p1.save((err:any)=> {
        if(!err){
            res.send("Inserted successfully")
        }else {
            res.send(err);
        }
    })
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


export let elastic_test = async (req: Request, res: Response) => {
    let client = new Client({ node: 'http://52.140.66.173:9200' })
    let { body } = await client.search({
        index: 'fluentd-test-2021.09.14',
        body: {
          query: {
            match: {res:404}
          }
        }
      })
      var re =  body.hits.hits;
    //   for (let i in re){
    //       res.send
    //   }
    // res.send(re)
    // res.json(re)
    res.json({data:re})
}

export let full_test = async (req:Request,res:Response)=>{
    let api_name:string = "/full_test";
    let rand:number = random.int(0,1000);
   let r1:number = rand%4;
//  let r1:number =0 ;
    let start_time = process.hrtime();
    let end_time:any;
    let time:any;
    let url:any = req.originalUrl || req.url
    await delay(500*4);

    switch(r1){
        case 0:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+200)
            end_time = process.hrtime(start_time);
            time=(end_time[0] * 1000 + end_time[1] / 1000);
            logger.emit("follow",{"req_host":req.hostname,"req_origin":req.socket.remoteAddress,"req_url":url,"method":req.method,"host_details":os.hostname(),"res":"200","time":time})  
            res.sendStatus(200);
           
            console.log(time);
            break;
        
        case 1:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+404)
            end_time = process.hrtime(start_time);
            time=(end_time[0] * 1000 + end_time[1] / 1000);
            logger.emit("follow",{"req_host":req.hostname,"req_origin":req.socket.remoteAddress,"req_url":url,"method":req.method,"host_details":os.hostname(),"res":"404","time":time})  

            res.sendStatus(404);
            console.log(time);

            break;

        case 2:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+500)
            end_time = process.hrtime(start_time);
            time=(end_time[0] * 1000 + end_time[1] / 1000);
            logger.emit("follow",{"req_host":req.hostname,"req_origin":req.socket.remoteAddress,"req_url":url,"method":req.method,"host_details":os.hostname(),"res":"500","time":time})  

            res.sendStatus(500);
            console.log(time);

            break;
        case 3:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+502)
            end_time = process.hrtime(start_time);
            time=(end_time[0] * 1000 + end_time[1] / 1000);
            logger.emit("follow",{"req_host":req.hostname,"req_origin":req.socket.remoteAddress,"req_url":url,"method":req.method,"host_details":os.hostname(),"res":"502","time":time})  

            res.sendStatus(502);
            console.log(time);

            break;
    }
}
