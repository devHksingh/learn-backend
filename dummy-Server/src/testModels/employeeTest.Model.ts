import mongoose from "mongoose";

const EmployeeTest = new mongoose.Schema({
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
    taskHistory:{
        
    },
    salary:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true, // manager|technician
    }
})