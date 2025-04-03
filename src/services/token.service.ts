import httpStatus from "http-status";
import { getUserById } from "./user.service";
import AppError from "../utils/AppError";
import prisma from "../client";
import { Token } from "@prisma/client";

const createToken = async (userId: number, token: string): Promise<Token> => {
  try {
    const getuser = await getUserById(userId);
    if (!getuser) {
      throw new AppError("User not found", httpStatus.NOT_FOUND);
    }
    return prisma.token.create({
      data: {
        userId,
        token,
      },
    });
  } catch (error) {
    throw new AppError(
      "Failed to create token",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export { createToken };
