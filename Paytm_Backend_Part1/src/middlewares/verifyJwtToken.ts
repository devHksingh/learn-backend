import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import createHttpError from "http-errors";

export interface JwtTokenVerification extends Request{
    isTokenExp:boolean,
    decodedToken:{}
}

const verifyJwtToken = (req:Request,res:Response,next:NextFunction)=>{
    const { token } = req.body

    try {
        const isValidToken = jwt.verify(token as string,Config.jwtSecret as string)
        const _req = req as JwtTokenVerification
        _req.isTokenExp = false
        _req.decodedToken = isValidToken
        next()
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            const _req = req as JwtTokenVerification
            _req.isTokenExp = true
            next()
        }else{
            return next(createHttpError(400,"Invalid token"))
        }
    }
}