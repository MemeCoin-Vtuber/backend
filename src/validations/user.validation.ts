import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  walletAddress: Joi.string().required(),
});

export const loginSchema = Joi.object({
  walletAddress: Joi.string().required(),
});
