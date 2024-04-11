import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    console.log("Request data",req.body);
    
    const {name,email,password} = req.body
    // 1. validation

    if(!name || !email || !password){
        const error = createHttpError(400,"All fields are required!!")
        return next(error)
    }

    // 2. process / Logic
    // 3. Response
    res.json({
        message:"User registered"
    })
}

export { createUser }