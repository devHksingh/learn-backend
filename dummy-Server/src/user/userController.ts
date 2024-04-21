import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcryptjs'


const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    // console.log("request data" , req.body);
    // return res.json({req:req.body})
    

    const {name,email,password} = req.body
    //1. validation
    // if(!name || !email || !password){
    //     const error = createHttpError(400,'All fields are required')
    //     return next(error)
    // }
    // 2.logic/process
    // DB call
    const user = await userModel.findOne({email:email})

    if(user){
        const error = createHttpError(400,"User already exist with this email ID")
        return next(error)
    }

    // user store in db
    // user password -> hash
    const hashedPassword = await bcrypt.hash(password,10)
    


    // 3.Response

    return res
    .status(200)
    .json({
        messgae:"User created"
    })
}

export {createUser}