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

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


export let post_test_0 = async (req:Request,res:Response)=> {
    let api_name:string = "/post_test_0";
    let rand:number = random.int(0,1000);
    let r1:number = rand%4;
//  let r1:number =0 ;
    let url:any = req.originalUrl || req.url
    await delay(700*r1);
    switch(r1){
        case 0:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+200)
            res.sendStatus(200);
           
            break;
        
        case 1:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+408)
            

            res.sendStatus(408);

            break;

        case 2:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+500)
            

            res.sendStatus(500);

            break;
        case 3:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+502)
            

            res.sendStatus(502);

            break;
    }
}

export let post_test_1 = async (req:Request,res:Response)=> {
    let api_name:string = "/post_test_1";
    let rand:number = random.int(0,1000);
    let r1:number = rand%4;
//  let r1:number =0 ;
    let url:any = req.originalUrl || req.url
    await delay(300*r1);

    switch(r1){
        case 0:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+200)
            res.sendStatus(200);
           
            break;
        
        case 1:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+408)
            

            res.sendStatus(408);

            break;

        case 2:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+500)
            

            res.sendStatus(500);

            break;
        case 3:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+502)
            

            res.sendStatus(502);

            break;
    }
}

export let post_test_2 = async (req:Request,res:Response)=> {
    let api_name:string = "/post_test_2";
    let rand:number = random.int(0,1000);
    let r1:number = rand%4;
//  let r1:number =0 ;
    let url:any = req.originalUrl || req.url
    await delay(1500*r1);

    switch(r1){
        case 0:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+200)
            res.sendStatus(200);
           
            break;
        
        case 1:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+408)
            

            res.sendStatus(408);

            break;

        case 2:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+500)
            

            res.sendStatus(500);

            break;
        case 3:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+502)
            

            res.sendStatus(502);

            break;
    }
}





export let get_test_0 = async (req:Request,res:Response)=>{
    let api_name:string = "/get_test_0";
    let rand:number = random.int(0,1000);
    let r1:number = rand%4;
//  let r1:number =0 ;
    let url:any = req.originalUrl || req.url
    await delay(600*r1);

    switch(r1){
        case 0:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+200)
            res.sendStatus(200);
           
            break;
        
        case 1:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+408)

            

            res.sendStatus(408);

            break;

        case 2:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+500)

            res.sendStatus(500);

            break;
        case 3:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+502)

            res.sendStatus(502);

            break;
    }
}



export let get_test_2 = async (req:Request,res:Response)=>{
    let api_name:string = "/get_test_2";
    let rand:number = random.int(0,1000);
    let r1:number = rand%4;
//  let r1:number =0 ;
    let url:any = req.originalUrl || req.url
    await delay(r1*1000);

    switch(r1){
        case 0:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+200)
            res.sendStatus(200);
           
            break;
        
        case 1:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+408)

            res.sendStatus(408);

            break;

        case 2:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+500)
            

            res.sendStatus(500);

            break;
        case 3:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+502)
            

            res.sendStatus(502);

            break;
    }
}

export let get_test_1 = async (req:Request,res:Response)=>{
    let api_name:string = "/get_test_1";
    let rand:number = random.int(0,1000);
    let r1:number = rand%4;
//  let r1:number =0 ;
    let url:any = req.originalUrl || req.url
    await delay(r1*500);

    switch(r1){
        case 0:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+200)
            res.sendStatus(200);
           
            break;
        
        case 1:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+408)
            

            res.sendStatus(408);

            break;

        case 2:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+500)
            res.sendStatus(500);
            break;
        case 3:
            console.log("host"+req.hostname+" "+req.socket.remoteAddress+" "+url+" " +req.method+" "+502)
            

            res.sendStatus(502);

            break;
    }
}