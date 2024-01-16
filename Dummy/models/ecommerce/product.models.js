import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    description:{
        required:true,
        type:String,
    },
    name:{
        required:true,
        type:String,
    },
    // cloudnery
    productImage:{
        type:String
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    stock:{
        type:Number,
        default:0,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required:true,
        
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Product = mongoose.model('Product',productSchema)