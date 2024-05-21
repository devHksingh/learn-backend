import express from "express";
import {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  userSignIn,
} from "./user.Controller";
import verifyJwtToken from "../middlewares/verifyJwtToken";

const userRoute = express.Router();

userRoute.get("/", verifyJwtToken, getAllUser);

userRoute.get("/:userId", getSingleUser);

userRoute.post("/", createUser);

userRoute.post("/signin", verifyJwtToken, userSignIn);

userRoute.patch("/:userId", verifyJwtToken, updateSingleUser);

export default userRoute;
