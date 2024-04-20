import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";


const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    console.log("request data" , req.body);
    // return res.json({req:req.body})
    

    const {name,email,password} = req.body
    //1. validation
    // if(!name || !email || !password){
    //     const error = createHttpError(400,'All fields are required')
    //     return next(error)
    // }
    // 2.logic/process
    // 3.Response

    res
    .status(200)
    .json({
        messgae:"User created"
    })
}

export {createUser}