import mongoose, { Schema } from "mongoose";

const employeeTestSchema = new mongoose.Schema({
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
    taskHistory:[{
        type:Schema.Types.ObjectId,
        ref:'Task'
    }],
    salary:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true, // manager|technician
    }
})

export const EmployeeTest = mongoose.model('EmployeeTest',employeeTestSchema)