import express, { Router } from "express";

import { checkUsername, checkEmail } from "../controllers/check";
const router: Router = express.Router();

// Check routes
router.post("/check/email", checkEmail);
router.post("/check/username", checkUsername);

 export default router;
