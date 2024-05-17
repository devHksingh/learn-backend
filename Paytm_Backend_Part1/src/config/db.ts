import mongoose from "mongoose";
import { Config } from ".";
//import { config } from "./src/config";

const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log('Connected to database successfully');
    })
    mongoose.connection.on('error',(err)=>{
        console.log('Error in connecting to database', err);

    })
    try {
        await mongoose.connect(Config.databaseUrl as string)
    } catch (error) {
        console.log('MongoDb connection failed!!!!! ');
        process.exit(1)  
    }
}

export default connectDB