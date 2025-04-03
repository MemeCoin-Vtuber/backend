import { Request, Response, NextFunction } from "express";
import {
  getAgentDisplay,
  createAgentDisplay,
} from "../services/agentdisplay.service";
import AppError from "../utils/AppError";
import HttpStatus from "http-status";

const createAgentDisplayController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { agentImageUrl, agentName, agentIpfsUrl, tokenId } = req.body;
  if (!agentImageUrl || !agentName || !agentIpfsUrl || !tokenId) {
    throw new AppError(
      "Please provide agentImageUrl, agentName and agentIpfsUrl",
      HttpStatus.BAD_REQUEST
    );
  }
  const agentDisplay = await createAgentDisplay(
    agentImageUrl,
    agentName,
    agentIpfsUrl,
    tokenId
  );
  if (!agentDisplay) {
    throw new AppError(
      "Failed to create agentDisplay",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  res.status(200).json({
    agentDisplay,
  });

  try {
  } catch (error) {
    next(error);
  }
};

const getAgentDisplayController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agentDisplay = await getAgentDisplay();
    res.status(200).json({
      agentDisplay,
    });
  } catch (error) {
    next(error);
  }
};

export { createAgentDisplayController, getAgentDisplayController };
