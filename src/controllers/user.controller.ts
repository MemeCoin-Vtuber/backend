import { Request, Response, NextFunction } from "express";
import { createUser, getUserById } from "../services/user.service";
import AppError from "../utils/AppError";
import HttpStatus from "http-status";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, walletAddress } = req.body;

    if (!username || !email || !walletAddress) {
      throw new AppError(
        "Please provide username, email and wallet address",
        HttpStatus.BAD_REQUEST
      );
    }

    const user = await createUser(username, email, walletAddress);
    if (!user) {
      throw new AppError(
        "Failed to create user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new AppError(
        "JWT_SECRET is not defined",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};
