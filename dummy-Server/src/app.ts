import express, { NextFunction, Request, Response }  from "express";

import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express()

// Routes
// app.use()

app.get('/',(req,res,next)=>{

    // const error = createHttpError(400,"something went wrong testing error!")
    // throw error
    res.json({
        message:'Wellcome to dummy server api '
    })
})

// Global error handler

app.use(globalErrorHandler)



export default app