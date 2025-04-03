import httpStatus from "http-status";
import AppError from "../utils/AppError";
import prisma from "../client";

const createAgentDisplay = async (
  agentImageUrl: string,
  agentName: string,
  agentIpfsUrl: string,
  tokenId: number
) => {
  try {
    const agentDisplay = await prisma.agentDisplay.create({
      data: {
        agentImageUrl,
        agentName,
        agentIpfsUrl,
        aiToken: {
          connect: { id: tokenId },
        },
      },
    });
    return agentDisplay;
  } catch (error: any) {
    throw new AppError(
      "Internal server error",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const getAgentDisplay = async () => {
  try {
    const agentDisplay = await prisma.agentDisplay.findMany();
    return agentDisplay;
  } catch (error: any) {
    throw new AppError(
      "Internal server error",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export { createAgentDisplay, getAgentDisplay };
