import { body } from "express-validator";

const schema = [
    body('name')
      .isString()
      .notEmpty()
      .isLength({min:2})
      .withMessage('Name is required and at least 2 characters long'),
    body('email')
      .isEmail()
      .withMessage('Email must contain a valid email address'),
    body('password')
      .isLength({min:4})
      .withMessage('password is required and must be at least 4 characters long')
]  


export {schema as userRegisterSchema}