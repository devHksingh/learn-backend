// require('dotenv').config({path:'./env'})

import dotenv from "dotenv"


import connectDB from './db/index.js';

dotenv.config({
    path:'./env'
})


// 2nd approach





connectDB()











// 1st approach
/*
import mongoose from 'mongoose';
import { DB_NAME } from './constants';

import express from "express"
const app = express()

// function connectDB(){}

// IFFIE
;( async()=>{
    try {

       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

       app.on("error",(error)=>{
        console.log("error",error);
        throw error
       })

       app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT} `);
       })
        
    } catch (error) {
        console.error("ERROR",error)
        throw error
    }
})()
*/