import httpStatus from "http-status";
import AppError from "../utils/AppError";
import prisma from "../client";

const createPersonality = async (
  aiTokenId: number,
  aiPersonalityImageUrl: string,
  aiPersonality: string,
  aiPersonalityDescription: string,
  aiPersonalityVoice?: string,
  aiPersonalityType?: string
) => {
  try {
    return prisma.personality.create({
      data: {
        aiPersonalityImageUrl,
        aiPersonality,
        aiPersonalityDescription,
        aiPersonalityVoice,
        aiPersonalityType,
        aiToken: { connect: { id: aiTokenId } },
      },
    });
  } catch (error: any) {
    throw new AppError(
      "Internal server error",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const getPersonalityByTokenId = async (aiTokenId: number) => {
  try {
    return prisma.personality.findUnique({
      where: { aiTokenId },
    });
  } catch (error: any) {
    throw new AppError(
      "Internal server error",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export { createPersonality, getPersonalityByTokenId };
