import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import HttpStatus from "http-status";

interface User {
  id: number;
  username: string;
  email: string;
}

export const authenticateJwt = (
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new AppError(
        "Access token is missing or invalid",
        HttpStatus.UNAUTHORIZED
      )
    );
  }

  const token = authHeader.split(" ")[1];
  try {
    const secretKey = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secretKey) as User;

    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError("Invalid or expired token", HttpStatus.FORBIDDEN));
  }
};
