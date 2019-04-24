import express, { Router } from "express";

import { checkUsername, checkEmail, checkIfUserIsSubscriber } from "../controllers/check";
import { requireAuth } from "../middlewares/auth";
const router: Router = express.Router();

// Check routes
router.post("/check/email", checkEmail);
router.post("/check/username", checkUsername);
router.post("/check/subscribers/:id", requireAuth, checkIfUserIsSubscriber);

 export default router;
