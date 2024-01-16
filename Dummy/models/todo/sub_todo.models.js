import mongoose from 'mongoose';

const subTodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    completed:{
        type:Boolean,
        default:false,
        // required:true
    },
    
},{timestamps:true})


export const SubTodo = mongoose.model('SubTodo',subTodoSchema)