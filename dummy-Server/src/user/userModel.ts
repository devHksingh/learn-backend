import mongoose from "mongoose";
import { UserType } from "./userTypes";


const userSchema = new mongoose.Schema<UserType>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },

},{timestamps:true})

// users
export default mongoose.model<UserType>('User',userSchema)