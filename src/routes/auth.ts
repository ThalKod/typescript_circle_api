import express, { Router }  from "express";
import { signUp } from "../controllers/auth";
import { requireSignin } from "../middlewares/auth";

const router:Router = express.Router();

// Index Routes
router.post("/signup", signUp);

// router.post("/signin" );

export default router;
