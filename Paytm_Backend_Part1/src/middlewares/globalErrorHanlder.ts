import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { Config } from "../config";



const globalErrorHandler = async (err:HttpError,req:Request,res:Response,next:NextFunction) =>{
    const statusCode = err.statusCode || 500
    return res.status(statusCode).json({
        message:err.message,
        errorStack:Config.env === "development"?err.stack:""
    })
}

export default globalErrorHandler