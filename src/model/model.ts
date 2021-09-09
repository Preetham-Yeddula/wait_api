import mongoose, { Document, Model, Schema } from "mongoose";

interface Payload extends Document{
    _id:Number;
    payload:string;
    
}

let PaySchema:Schema = new Schema({
    _id:{type:Number, required:true},
    payload:{type:Number,required:true}
    

})

let PayModel = mongoose.model<Payload>("",PaySchema,"Payloads")
export default PayModel;