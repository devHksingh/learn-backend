import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})


export const User = mongoose.model('User',usersSchema)