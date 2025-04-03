import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import HttpStatus from "http-status";
import { createAIToken } from "../services/aitoken.service";

export const createAITokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userId,
      tokenName,
      symbol,
      tokenDescription,
      tokenImageUrl,
      supply,
    } = req.body;

    if (
      !userId ||
      !tokenName ||
      !symbol ||
      !tokenDescription ||
      !tokenImageUrl ||
      !supply
    ) {
      throw new AppError(
        "Please provide userId, tokenName, symbol, tokenDescription, tokenImageUrl and supply",
        HttpStatus.BAD_REQUEST
      );
    }

    const aitoken = await createAIToken(
      userId,
      tokenName,
      symbol,
      tokenDescription,
      tokenImageUrl,
      supply
    );
    if (!aitoken) {
      throw new AppError(
        "Failed to create aitoken",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    res.status(200).json({
      aitoken,
    });
  } catch (error) {
    next(error);
  }
};
