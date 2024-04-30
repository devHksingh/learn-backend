import mongoose, { Schema } from "mongoose";

const clientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    avatar:{
        type:String, //cloudinary url
        
    },
    password:{
        type:String,
        required: [true,'Password is required']

    },
    refreshToken:{
        type:String
    },
    taskHistory:[{
        type:Schema.Types.ObjectId,
        ref:'Task'
    }],
    
},{timestamps:true})

export const Client = mongoose.model('Client',clientSchema)