import { Request,Response } from "express";
import { HttpError } from "http-errors";
import { Config } from "../config";


const globalErrorHandler = (err:HttpError,req:Request,res:Response)=>{
    const statusCode = err.statusCode || 500
    const message = err.message

    res.status(statusCode).json({
        status: "error",
        success:false,
        message,
        errorStack: Config.NODE_ENV === 'development' ? err.stack:""
    })

}

export default globalErrorHandler