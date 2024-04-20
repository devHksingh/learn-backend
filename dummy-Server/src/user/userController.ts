import { NextFunction, Request, Response } from "express";


const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    res
    .status(200)
    .json({
        messgae:"User created"
    })
}

export {createUser}