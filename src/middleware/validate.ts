import { Response, Request, NextFunction } from "express";
import { Schema } from "joi";
import AppError from "../utils/AppError";
import HttpStatus from "http-status";

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const message = error.details.map((detail) => detail.message).join(", ");
      throw new AppError(message, HttpStatus.BAD_REQUEST);
    }
    next();
  };
};

export { validate };
