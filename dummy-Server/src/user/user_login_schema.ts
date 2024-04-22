import { body } from "express-validator";

const schema = [
    body('email')
        .isEmail()
        .withMessage("Email is required fro login"),
    body('password')
        .isString()
        .withMessage('password is required for login and must be at least 4 characters long')


]

export {schema as userLoginSchema}