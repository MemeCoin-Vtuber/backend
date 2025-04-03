import { User } from "@prisma/client";
import prisma from "../client";
import AppError from "../utils/AppError";
import HttpStatus from "http-status";

const createUser = async (
  username: string,
  email: string,
  walletAddress: string
): Promise<User> => {
  try {
    if (await getUserByEmail(email)) {
      throw new AppError("Email already exists", HttpStatus.BAD_REQUEST);
    }
    const user = await prisma.user.create({
      data: {
        username,
        email,
        walletAddress,
      },
    });
    return user;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new AppError("User already exists", HttpStatus.BAD_REQUEST);
    }
    throw new AppError(
      error.message || "Internal server error",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const getUserById = async (id: number): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    throw new AppError(
      "Failed to fetch user by ID",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    throw new AppError(
      "Failed to fetch user by email",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const getUserByWaletAddress = async (
  walletAddress: string
): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({
      where: { walletAddress },
    });
  } catch (error) {
    throw new AppError(
      "Failed to fetch user by wallet address",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteUser = async (userId: number): Promise<User> => {
  try {
    return prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    throw new AppError(
      "Failed to delete user",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByWaletAddress,
  deleteUser,
};
