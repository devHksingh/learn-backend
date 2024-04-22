import express from "express";
import { createUser, loginUser } from "./userController";
import validate_User_req_schema from "../middlewares/validate_User_register_req_schema";
import { userRegisterSchema } from "./user_register_schema";
import { userLoginSchema } from "./user_login_schema";

const userRouter = express.Router()

// routes



userRouter.post(
    '/register',
    userRegisterSchema,
    validate_User_req_schema,
    createUser
)

userRouter.post(
    '/login',
    userLoginSchema,
    validate_User_req_schema,
    loginUser
)


export default userRouter