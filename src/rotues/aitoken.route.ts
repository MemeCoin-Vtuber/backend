import { createAITokenController } from "../controllers/aitoken.controller";
import express from "express";
import { validate } from "../middleware/validate";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { createAITokenSchema } from "../validations/aitoken.validation";

const router = express.Router();

router.post(
  "/create_token",
  validate(createAITokenSchema),
  asyncErrorHandler(createAITokenController)
);

export default router;
