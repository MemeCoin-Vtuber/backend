import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import HttpStatus from "http-status";
import {
  addTokenToSocialPlatform,
  createSocialPlatform,
} from "../services/socialplatform.service";

const addSocialPlatformController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      aiTokenId,
      socialPlatformId,
      username,
      emailId,
      password,
      knowledgeBase,
    } = req.body;
    console.log(req.body);
    if (!aiTokenId || !socialPlatformId) {
      throw new AppError(
        "Please provide aiTokenId and socialPlatformId",
        HttpStatus.BAD_REQUEST
      );
    }
    const socialPlatformToken = await addTokenToSocialPlatform(
      aiTokenId,
      socialPlatformId,
      username,
      emailId,
      password,
      knowledgeBase
    );
    console.log(socialPlatformToken);
    if (!socialPlatformToken) {
      throw new AppError(
        "Failed to create socialPlatformToken",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    res.status(200).json({
      socialPlatformToken,
    });
  } catch (error) {
    next(error);
  }
};

const createSocialPlatformController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { platformType } = req.body;

    if (!platformType) {
      throw new AppError("Please provide platformType", HttpStatus.BAD_REQUEST);
    }
    const socialPlatform = await createSocialPlatform(platformType);
    if (!socialPlatform) {
      throw new AppError(
        "Failed to create social platform",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    res.status(201).json(socialPlatform);
  } catch (error) {
    next(error);
  }
};

export { addSocialPlatformController, createSocialPlatformController };
