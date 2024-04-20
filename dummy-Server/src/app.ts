import express, { NextFunction, Request, Response }  from "express";

import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express()

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