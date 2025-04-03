import httpStatus from "http-status";
import AppError from "../utils/AppError";
import prisma from "../client";

const addTokenToSocialPlatform = async (
  aiTokenId: number,
  socialPlatformId: number,
  username?: string,
  emailId?: string,
  password?: string,
  knowledgeBase?: string
) => {
  try {
    console.log(
      aiTokenId,
      socialPlatformId,
      username,
      emailId,
      password,
      knowledgeBase
    );

    if (!aiTokenId || !socialPlatformId) {
      throw new AppError(
        "Please provide aiTokenId and socialPlatformId",
        httpStatus.BAD_REQUEST
      );
    }

    const aiToken = await prisma.aIToken.findUnique({
      where: { id: aiTokenId },
    });
    console.log("existsssss", aiToken);

    if (!aiToken) {
      throw new AppError(
        `AIToken with id ${aiTokenId} not found`,
        httpStatus.NOT_FOUND
      );
    }
    return prisma.socialPlatformToken.create({
      data: {
        emailId,
        password,
        knowledgeBase,
        username,
        aiToken: { connect: { id: aiTokenId } },
        socialPlatform: { connect: { id: socialPlatformId } },
      },
    });
  } catch (error: any) {
    throw new AppError(error, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const createSocialPlatform = async (platformType: string) => {
  try {
    if (!platformType) {
      throw new AppError("Please provide platformType", httpStatus.BAD_REQUEST);
    }

    return prisma.socialPlatform.create({
      data: {
        platformType,
      },
    });
  } catch (error: any) {
    throw new AppError(error, httpStatus.INTERNAL_SERVER_ERROR);
  }
};
export { addTokenToSocialPlatform, createSocialPlatform };
