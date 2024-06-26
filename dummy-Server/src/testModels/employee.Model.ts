import mongoose, { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
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
    role:{
        type:String,
        required:true
    },
    taskHistory:[{
        type:Schema.Types.ObjectId,
        ref:'Task'
    }],
    salary:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const Employee = mongoose.model('Employee',employeeSchema)