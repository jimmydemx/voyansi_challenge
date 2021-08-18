// import  Mongoose  from "mongoose";
const Mongoose=require("mongoose");
const Schema=Mongoose.Schema

const room= new Schema({
    id:{
        type:Number
    },
    name:{
        type:String
    },
    number:{
        type:Number
    },
    occupant:{
        type:String
    }


})

module.exports=Mongoose.model("room",room)
