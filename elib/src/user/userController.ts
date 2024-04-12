import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    console.log("Request data",req.body);
    
    const {name,email,password} = req.body
    // 1. validation

    if(!name || !email || !password){
        const error = createHttpError(400,"All fields are required!!")
        return next(error)
    }

    // DB call
    try {
        const user = await userModel.findOne({email:email})

        if(user){
            const error = createHttpError(400,"User already exits with this email")
            return next(error)
        }
    } catch (err) {
        return next(createHttpError(500,"Error while getting user"))
    }

    

    // password -> hash

    const hashedPassword = await bcrypt.hash(password,10)

    let newUser:User

    try {
        newUser = await userModel.create({
            name,
            email,
            password:hashedPassword
        })
    } catch (err) {
        return next(createHttpError(500,"Error creating user"))
    }

    // Token generation JWT

    try {
        const token =  sign({sub: newUser._id},config.jwtSecret as string , {expiresIn:'7d', algorithm:"HS256",})
    
    
        
        // 3. Response
        res.status(201).json({
            accessToken: token
        })
    } catch (err) {
        return next(createHttpError(500,"error while signing the jwt token"))
    }
}

const loginUser = async(req:Request,res:Response,next:NextFunction)=>{

    const { email,password } = req.body

    if(!email || !password){
        return next(createHttpError(400,"Email and Pssword are required for login"))
    }

    let user

    try {
         user = await userModel.findOne({email:email})
    
        if(!user){
            return next(createHttpError(404,"User not found"))
    
        }
    } catch (error) {
        return next(createHttpError(500,"DB CONNECTION PROBLEM"))
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        return next(createHttpError(400,"Password is incorrect"))
    }

    // create access token

    const token = sign({sub:user._id},config.jwtSecret as string,{
        expiresIn:"7d",
        algorithm:"HS256"
    })




    res
    .status(200)
    .json({accessToken:token})
}

export { createUser,loginUser }