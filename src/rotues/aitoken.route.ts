import {
  createAITokenController,
  getAllAITokenController,
  getAITokenByIdController,
} from "../controllers/aitoken.controller";
import express from "express";
import { validate } from "../middleware/validate";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { createAITokenSchema } from "../validations/aitoken.validation";
import { authenticateJwt } from "../middleware/jwtAuthMiddleware";

const router = express.Router();

router.post(
  "/create_token/:userId",
  validate(createAITokenSchema),
  authenticateJwt,
  asyncErrorHandler(createAITokenController)
);

router.get("/explore/:tokenId", asyncErrorHandler(getAITokenByIdController));
router.get("/explore", asyncErrorHandler(getAllAITokenController));

export default router;
