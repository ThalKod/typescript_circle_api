import express, { Router } from "express";

import { requireAuth } from "../middlewares/auth";
import { getUser } from "../controllers/user";

const router: Router = express.Router();


// User Routes

router.get("/user/me", requireAuth, getUser);

export default router;


