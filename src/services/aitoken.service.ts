import httpStatus from "http-status";
import AppError from "../utils/AppError";
import prisma from "../client";

const createAIToken = async (
  tokenName: string,
  symbol: string,
  tokenDescription: string,
  tokenImageUrl: string,
  supply: number,
  userId: number
) => {
  try {
    const aitoken = await prisma.aIToken.create({
      data: {
        tokenName,
        symbol,
        tokenDescription,
        tokenImageUrl,
        supply,
        userId,
      },
    });
    return aitoken;
  } catch (error: any) {
    throw new AppError(
      "Internal server error",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const getAITokenById = async (tokenId: number) => {
  try {
    return prisma.aIToken.findUnique({
      where: { id: tokenId },
      select: {
        tokenName: true,
        tokenDescription: true,
        contractAddress: true,
        streamDetails: {
          select: {
            youtubeChannelId: true,
          },
        },
      },
    });
  } catch (error: any) {
    throw new AppError(
      "Internal server error",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const updateTokenContractAddress = async (
  tokenId: number,
  contractAddress: string
) => {
  try {
    return prisma.aIToken.update({
      where: { id: tokenId },
      data: {
        contractAddress,
      },
    });
  } catch (error: any) {
    throw new AppError(
      "Internal server error",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllTokens = async () => {
  try {
    return prisma.aIToken.findMany({
      select: {
        tokenImageUrl: true,
        tokenName: true,
        tokenDescription: true,
      },
    });
  } catch (error: any) {
    throw new AppError(
      "Internal server error",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const getUserTokens = async (userId: number) => {
  try {
    return prisma.aIToken.findMany({
      where: { userId },
      include: {
        personality: true,
        agentDisplay: true,
        streamDetails: true,
      },
    });
  } catch (error: any) {
    throw new AppError(
      "Internal server error",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export {
  createAIToken,
  getAITokenById,
  updateTokenContractAddress,
  getUserTokens,
  getAllTokens,
};
