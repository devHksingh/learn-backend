import { NextFunction, Request, Response } from "express"
import {  validationResult } from "express-validator"
import createHttpError from "http-errors"


const validate_User_register_req_schema = (req:Request,res:Response,next:NextFunction) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    

    const [{msg}]= errors.array()
    
    console.log( errors.array());

    const error = `${msg}`
    const httpError = createHttpError(400,`${error}`)
    return next(httpError)
    
   // const httpError = createHttpError(400,`as:${error.array()}`)
    
  }
  next()
}

export default validate_User_register_req_schema