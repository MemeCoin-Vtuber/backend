import express from "express";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { authenticateJwt } from "../middleware/jwtAuthMiddleware";
import {
  createAgentDisplayController,
  getAgentDisplayController,
} from "../controllers/displayagent.controller";

const router = express.Router();

router.post(
  "/create_display_agent",
  authenticateJwt,
  asyncErrorHandler(createAgentDisplayController)
);

router.get(
  "/get_display_agent",
  authenticateJwt,
  asyncErrorHandler(getAgentDisplayController)
);

export default router;
