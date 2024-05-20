import { NextFunction, Request, Response } from "express";
import { User } from "./user.Model";
import createHttpError from "http-errors";
import genrateJWTToken from "../utils/jwtToken";



const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    const {username,email,password,firstName,lastName} = req.body
    let user
    let token
    // check if user is already exist?
    try {
        user = await User.findOne({email})
        if(user){
            return next(createHttpError(411,"User Already exist with this email"))
        }
        
        const newUser = await User.create({
            username,
            email,
            password,
            firstName,
            lastName
        })

        token =  genrateJWTToken({id:newUser._id})    
        
    } catch (error) {
        return next(createHttpError(500,"Error occured while creating a user"))
    }

    return res.status(200).json({"messsage":"User is created successfully","token":token})
}

const getAllUser = async (req:Request,res:Response,next:NextFunction)=>{
    let user 
    try {
        user = await User.find({}).select("-password -email")
    } catch (error) {
        return next(createHttpError(500,"Error occured while fetching  user details"))
    }
    return res.status(200).json({user})
}

const  getSingleUser = async (req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.userId
    let user 
    try {
        user = await User.find({_id:id}).select("-password -email")
    } catch (error) {
        return next(createHttpError(500,"Error occured while fetching  user details"))
    }
    return res.status(200).json({user})
}



export {
    createUser,
    getAllUser,
    getSingleUser
}