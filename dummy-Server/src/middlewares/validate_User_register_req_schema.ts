import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import createHttpError from "http-errors"


const validate_User_register_req_schema = (req:Request,res:Response,next:NextFunction) => {
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(400).json({ errors: error.array() });
  }
}

export default validate_User_register_req_schema