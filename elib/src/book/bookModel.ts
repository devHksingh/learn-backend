import mongoose from "mongoose";
import { Book } from "./bookTypes";

const bookSchema = new mongoose.Schema<Book>({
    title:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    coverImage:{
        tpye:String,
        required:true
    },
    file:{
        tpye:String,
        required:true
    },
    genre:{
        tpye:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model<Book>('Book',bookSchema)