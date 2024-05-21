import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import createHttpError from "http-errors";

interface DecodedToken {
  id: string;
  iat:number;
  exp:number;
  // Add other properties if your JWT payload includes more information
}
export interface JwtTokenVerification extends Request {
  isTokenExp: boolean;
  decodedToken:DecodedToken
}

const verifyJwtToken = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.header("Authorization");
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return next(createHttpError(403, "Invalid Auth token"));
  }
  const token = authToken.split(" ").at(1);
  try {
    const isValidToken = jwt.verify(
      token as string,
      Config.jwtSecret as string,
    );
    const _req = req as JwtTokenVerification;
    _req.isTokenExp = false;
    _req.decodedToken = isValidToken as DecodedToken;
    console.log(_req.decodedToken);

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const _req = req as JwtTokenVerification;
      _req.isTokenExp = true;
      next();
    } else {
      return next(createHttpError(400, "Invalid token"));
    }
  }
};

export default verifyJwtToken;
