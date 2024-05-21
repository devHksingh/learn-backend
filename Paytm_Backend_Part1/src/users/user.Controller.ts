import { NextFunction, Request, Response } from "express";
import { User } from "./user.Model";
import createHttpError from "http-errors";
import genrateJWTToken from "../utils/jwtToken";
import zod, { optional } from "zod";
import { JwtTokenVerification } from "../middlewares/verifyJwtToken";
import bcrypt from "bcryptjs";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, firstName, lastName } = req.body;
  let user;
  let token;
  // check if user is already exist?
  try {
    user = await User.findOne({ email });
    if (user) {
      return next(createHttpError(411, "User Already exist with this email"));
    }

    const newUser = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    token = genrateJWTToken({ id: newUser._id });
  } catch (error) {
    return next(createHttpError(500, "Error occured while creating a user"));
  }

  return res
    .status(200)
    .json({ messsage: "User is created successfully", token: token });
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  let user;
  try {
    user = await User.find({}).select("-password -email");
  } catch (error) {
    return next(
      createHttpError(500, "Error occured while fetching  user details"),
    );
  }
  return res.status(200).json({ user });
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.userId;
  let user;
  try {
    user = await User.find({ _id: id }).select("-password -email");
  } catch (error) {
    return next(
      createHttpError(500, "Error occured while fetching  user details"),
    );
  }
  return res.status(200).json({ user });
};

const userSignIn = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, email } = req.body;
  const signInReqschema = zod
    .object({
      userName: zod.string().optional(),
      email: zod.string().optional(),
      password: zod.string().min(6),
    })
    .refine((data) => data.userName || data.email);

  const { success } = signInReqschema.safeParse(req.body);
  console.log(req.body);
  console.log(success);
  if (!success) {
    return next(createHttpError(401, "Invalid user credentials"));
  }
  // Find user by username or email
  let user;
  try {
    user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if password is correct
    const isValidPassword = await user.isPasswordCorrect(req.body.password);
    // const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isValidPassword) {
      return next(createHttpError(401, "Invalid user credentials"));
    }
  } catch (error) {
    return next(
      createHttpError(500, "Error occured while fetching  user details"),
    );
  }

  return res.status(200).json({ user });
};

const updateSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateBodySchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
  });
  const _req = req as JwtTokenVerification;
  const { id } = _req.decodedToken;
  // const userId = req.params.userId
  // console.log(id);
  // if(userId !== id ){
  //   return next(createHttpError(411,'Invalid userId'))
  // }
  const { success } = updateBodySchema.safeParse(req.body);
  if (!success) {
    return next(createHttpError(411, "Error while updating information"));
  }

  let { password, firstName, lastName } = req.body;
  console.log(req.body);

  let updatedFeild;
  if (password) {
    password = await bcrypt.hash(password, 10);
    updatedFeild = { password };
  }

  if (password && firstName && lastName) {
    updatedFeild = { password, firstName, lastName };
  }
  if (firstName) {
    updatedFeild = { firstName };
  }
  if (firstName && password) {
    updatedFeild = { password, firstName };
  }
  if (firstName && lastName) {
    updatedFeild = { firstName, lastName };
  }

  if (lastName && password) {
    updatedFeild = { password, lastName };
  } else if (lastName) {
    updatedFeild = { lastName };
  }

  let user;

  try {
    user = await User.updateOne({ _id: id }, updatedFeild);
    if (!user) {
      return next(createHttpError(404, "user not found"));
    }
    console.log(user);
  } catch (error) {
    return next(createHttpError(500, "DB error while fetching user details"));
  }

  return res.status(200).json({
    message: "Update Successfull",
  });
};

export { createUser, getAllUser, getSingleUser, userSignIn, updateSingleUser };
