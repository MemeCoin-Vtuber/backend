import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import HttpStatus from "http-status";
import { createPersonality } from "../services/personality.service";

const createPersonalityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      aiTokenId,
      aiPersonalityImageUrl,
      aiPersonality,
      aiPersonalityDescription,
      aiPersonalityVoice,
      aiPersonalityType,
    } = req.body;

    if (
      !aiTokenId ||
      !aiPersonalityImageUrl ||
      !aiPersonality ||
      !aiPersonalityDescription
    ) {
      throw new AppError(
        "Please provide aiTokenId, aiPersonalityImageUrl, aiPersonality and aiPersonalityDescription",
        HttpStatus.BAD_REQUEST
      );
    }
    const personality = await createPersonality(
      aiTokenId,
      aiPersonalityImageUrl,
      aiPersonality,
      aiPersonalityDescription,
      aiPersonalityVoice,
      aiPersonalityType
    );
    if (!personality) {
      throw new AppError(
        "Failed to create personality",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    res.status(201).json(personality);
  } catch (error) {
    next(error);
  }
};

export { createPersonalityController };
