import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken"
import { config } from "../config/config";

export interface AuthRequest extends Request{
    userId:String
}

const authenticate =(req:Request,res:Response,next:NextFunction)=>{
    const token = req.header('Authorization')
    if(!token){
        return next(createHttpError(401,"Auth token is required"))
    }

    

    try {
        const paresedToken = token.split(' ')[1]
        const decoded = jwt.verify(paresedToken,config.jwtSecret as string)
    
        console.log('decoded token',decoded);

        const _req = req as AuthRequest
        _req.userId = decoded.sub as string
        next()
    } catch (err) {
       return next(createHttpError(401,"Token expired")) 
    }
    
    
    
}

export default authenticate