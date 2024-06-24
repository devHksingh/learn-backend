import express from "express";
import {
  createUser,
  getAllUser,
  getfilterUser,
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

// Route to get users from the backend, filterable via firstName/lastName

userRoute.post("/bulk", verifyJwtToken, getfilterUser);

export default userRoute;
