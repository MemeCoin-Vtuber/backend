import { Router } from "express";
import { login } from "../controllers/login.controller";
import { loginSchema } from "../validations/user.validation";
import { validate } from "../middleware/validate";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";

const router = Router();

router.post("/login", validate(loginSchema), asyncErrorHandler(login));

export default router;
