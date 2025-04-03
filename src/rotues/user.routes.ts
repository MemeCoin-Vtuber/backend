import express from "express";
import { validate } from "../middleware/validate";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { createUserController } from "../controllers/user.controller";
import { createUserSchema } from "../validations/user.validation";

const router = express.Router();

router.post(
  "/create_user",
  validate(createUserSchema),
  asyncErrorHandler(createUserController)
);

export default router;
