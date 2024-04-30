import mongoose from "mongoose";
import { config } from "./config";



const connectDB = async()=>{
   try {

    mongoose.connection.on("connected",()=>{
        console.log("connected to database successfully");
        
    })

    mongoose.connection.on("error",(err)=>{
        console.log('Error in connecting to database',err);
        
    })

    await mongoose.connect(config.databaseUrl as string)

    

   } catch (error) {
        console.error("Failed to connect to database.",error)
        process.exit(1)
   }
}

export default connectDB