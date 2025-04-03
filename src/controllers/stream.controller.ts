import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import HttpStatus from "http-status";
import { createStream } from "../services/stream.service";

const createStreamController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { youtubeChannelId, twitchChannelId, aiTokenId } = req.body;

    if (!aiTokenId) {
      throw new AppError("Please provide aiTokenId", HttpStatus.BAD_REQUEST);
    }

    const stream = await createStream(
      youtubeChannelId,
      twitchChannelId,
      aiTokenId
    );
    if (!stream) {
      throw new AppError(
        "Failed to create stream",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    res.status(201).json(stream);
  } catch (error) {
    next(error);
  }
};

export { createStreamController };
