import express from "express";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { authenticateJwt } from "../middleware/jwtAuthMiddleware";
import {
  addSocialPlatformController,
  createSocialPlatformController,
} from "../controllers/socialplatform.controller";
const router = express.Router();

router.post(
  "/add_social_platform",
  authenticateJwt,
  asyncErrorHandler(addSocialPlatformController)
);

router.post(
  "/list_platforms",
  authenticateJwt,
  asyncErrorHandler(createSocialPlatformController)
);

export default router;
