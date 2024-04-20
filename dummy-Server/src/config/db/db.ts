import mongoose from "mongoose";
import { config } from "../config";



const connectDB = async ()=>{
   try {
    mongoose.connection.on('connected' ,()=>{
        console.log("Connected to DB successfully")
    })

    mongoose.connection.on('error',(err)=>{
        console.log('Error in connecting to DB',err)
    })


    await mongoose.connect(config.dbUrl as string)


   } catch (err) {
        console.error('Failed to connect database!!',err)
        process.exit(1)
   }
}

export default connectDB