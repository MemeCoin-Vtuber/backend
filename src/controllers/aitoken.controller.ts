import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import HttpStatus from "http-status";
import {
  createAIToken,
  getAITokenById,
  getAllTokens,
} from "../services/aitoken.service";

export const createAITokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { tokenName, symbol, tokenDescription, tokenImageUrl, supply } =
      req.body;
    if (
      !tokenName ||
      !symbol ||
      !tokenDescription ||
      !tokenImageUrl ||
      !supply
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        requiredFields: [
          "tokenName",
          "symbol",
          "tokenDescription",
          "tokenImageUrl",
          "supply",
        ],
      });
    }

    const aiToken = await createAIToken(
      tokenName,
      symbol,
      tokenDescription,
      tokenImageUrl,
      supply,
      parseInt(userId)
    );
    return res.status(201).json({
      success: true,
      message: "AI Token created successfully",
      data: aiToken,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAITokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const aiToken = await getAllTokens();
    return res.status(200).json({
      success: true,
      message: "AI Token fetched successfully",
      data: aiToken,
    });
  } catch (error) {
    next(error);
  }
};

export const getAITokenByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tokenId } = req.params;
    if (!tokenId) {
      new AppError("Please provide tokenId", HttpStatus.BAD_REQUEST);
    }
    const aiToken = await getAITokenById(parseInt(tokenId));
    return res.status(200).json({
      success: true,
      message: "AI Token fetched successfully",
      data: aiToken,
    });
  } catch (error) {
    next(error);
  }
};
