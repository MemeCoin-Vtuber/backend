import express from "express";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { authenticateJwt } from "../middleware/jwtAuthMiddleware";
import { createPersonalityController } from "../controllers/personality.controller";

const router = express.Router();

router.post(
  "/create_personality",
  authenticateJwt,
  asyncErrorHandler(createPersonalityController)
);

export default router;
