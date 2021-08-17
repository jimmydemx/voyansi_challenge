import  Mongoose  from "mongoose";
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

export default Mongoose.model("room",room)
