import Joi from "joi";

export const createAITokenSchema = Joi.object({
  userId: Joi.number().required(),
  tokenName: Joi.string().required(),
  symbol: Joi.string().required(),
  tokenDescription: Joi.string().required(),
  tokenImageUrl: Joi.string().required(),
  supply: Joi.number().required(),
});
