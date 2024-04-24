import express, { NextFunction, Request, Response }  from "express";
import cors from 'cors'
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import { config } from "./config/config";

const app = express()

// const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
// app.use(cors({
//     origin: config.frontendDomain,
//     methods:allowedMethods
// }))
app.use(
    cors({
      origin: config.frontendDomain,
    })
  );

// console.log(typeof(config.frontendDomain));


// app.use(cors())
app.use(express.json())

// Routes
// app.use()

app.get('/',(req,res,next)=>{

    // const error = createHttpError(400,"something went wrong testing error!")
    // throw error
    res.json({
        message:'Wellcome to dummy server api '
    })
})

app.use("/api/users",userRouter)

// Global error handler

app.use(globalErrorHandler)



export default app