import express from "express";
import { createUser } from "./userController";
import validate_User_register_req_schema from "../middlewares/validate_User_register_req_schema";
import { userRegisterSchema } from "./user_register_schema";

const userRouter = express.Router()

// routes



userRouter.post(
    '/register',
    userRegisterSchema,
    validate_User_register_req_schema,
    createUser
)


export default userRouter