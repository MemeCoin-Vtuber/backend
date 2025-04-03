import express from "express";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { authenticateJwt } from "../middleware/jwtAuthMiddleware";
import { createStreamController } from "../controllers/stream.controller";
const router = express.Router();

router.post(
  "/add_stream_details",
  authenticateJwt,
  asyncErrorHandler(createStreamController)
);

export default router;
