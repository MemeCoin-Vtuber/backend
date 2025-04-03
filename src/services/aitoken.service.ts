import httpStatus from "http-status";
import AppError from "../utils/AppError";
import prisma from "../client";
import { AIToken } from "@prisma/client";
import { getUserById } from "./user.service";

const createAIToken = async (
  userId: number,
  tokenName: string,
  symbol: string,
  tokenDescription: string,
  tokenImageUrl: string,
  supply: number
): Promise<AIToken> => {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new AppError("User not found", httpStatus.NOT_FOUND);
    }

    const aitoken = await prisma.aIToken.create({
      data: {
        tokenName,
        symbol,
        tokenDescription,
        tokenImageUrl,
        supply,
        user: {
          connect: { id: userId },
        },
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

export { createAIToken };
