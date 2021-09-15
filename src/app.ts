import express,{Application} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { router as Router } from './router/router';
import morganMiddleware from './config/morganMiddleware'
import { FluentClient } from '@fluent-org/logger';

let app:Application = express();
let cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(morganMiddleware)
let portNum = 8090 || process.env.PORT;

const logger = new FluentClient("fluentd.test",{
   socket:{
     host: "52.140.66.173",
     port: 24224,
     timeout: 3000
   }
 })

let url = "mongodb+srv://loadtester_27:1234loads@cluster0.5r7yd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let option = {
    useUnifiedTopology:true,
    useNewUrlParser:true
}
mongoose.connect(url,option).
then(con=>console.log("DB connected successful")).
catch(err=>console.log(err))


app.use('/api/load',Router);

app.listen(portNum,()=>console.log(`Server running in ${portNum}`))