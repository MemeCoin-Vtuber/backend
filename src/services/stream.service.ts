import httpStatus from "http-status";
import AppError from "../utils/AppError";
import prisma from "../client";

const createStream = async (
  youtubeChannelId: string | undefined,
  twitchChannelId: string | undefined,
  aiTokenId: number
) => {
  try {
    return prisma.streamDetails.create({
      data: {
        youtubeChannelId,
        twitchChannelId,
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

export { createStream };
