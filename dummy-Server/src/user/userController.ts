import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcryptjs'
import { sign } from "jsonwebtoken";
import crypto from 'crypto'
import { config } from "../config/config";


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

    if(!hashedPassword){
        const error = createHttpError(400,'Failed to create hashed password . try it again!!')
        return next(error)
    }
    const newUser = await userModel.create({
        name,
        email,
        password:hashedPassword
    })
    if(!newUser){
        const error = createHttpError(400,'Failed to create user in DB . try it again!!')
        return next(error)
    }
    // token generation :JWT
    const token = sign({sub:newUser._id},config.jwtSecret as string,{expiresIn:'7d',algorithm:"HS256"})

    
    // 3.Response

    return res
    .status(201)
    .json({
        messgae:`User created and id is ${newUser._id} `,
        token:token
    })
}

const loginUser = async (req:Request,res:Response,next:NextFunction) =>{
    res.json({message:'ok'})
}

export {createUser,loginUser}