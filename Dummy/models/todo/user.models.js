import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        
    }
},{timestamps:true})


export const User = mongoose.model('User',usersSchema)