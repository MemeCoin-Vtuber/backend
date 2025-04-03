import { getUserByWaletAddress } from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import HttpStatus from "http-status";
import { createToken } from "../services/token.service";
import jwt from "jsonwebtoken";

export async function login(req: Request, res: Response, next: NextFunction) {
  const { walletAddress } = req.body;

  try {
    if (!walletAddress) {
      return next(
        new AppError("Please enter walletAddress", HttpStatus.BAD_REQUEST)
      );
    }

    const user = await getUserByWaletAddress(walletAddress);

    if (!user) {
      return next(new AppError("User does not exist", HttpStatus.NOT_FOUND));
    }

    if (!process.env.JWT_SECRET) {
      return next(
        new AppError(
          "JWT_SECRET is not defined",
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      );
    }
    const expiresIn = parseInt(process.env.JWT_TOKEN_EXPIRY || "3600");

    const token = jwt.sign(
      { id: user.id, walletAddress: user.walletAddress },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    await createToken(user.id, token);

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.json({ error: error, status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
