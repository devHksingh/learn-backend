import mongoose, { Schema } from "mongoose";


const taskSchema = new mongoose.Schema({
    ticketNumber:{
        type:Number,
        unique:true,
        required:true
    },
    assignManager:{

    },
    assignEmployee:{

    },
    description:{
        type:String,
        required:true,

    },
    flag:{
        type:String, //  priority level high | low | medium
        required:true,
    },
    category:{
        type:String, //  Upgradation | Build | Service | Repair
        required:true,
    },
    estimateCost:{
        type:Number,
        required:true,
    },
    finalTotalCost:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true
    },
    paymentPaid:{
        type:Number,
        required:true
    },
    clientDetail:{
        type:Schema.Types.ObjectId,
        ref:'Client'
    }

},{timestamps:true})

export const Task = mongoose.model('Task',taskSchema) 