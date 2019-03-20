import express, { Router }  from "express";
import { signUp, signIn, getToken } from "../controllers/auth";
import { requireSignin } from "../middlewares/auth";

const router:Router = express.Router();

// Index Routes
router.post("/signup", signUp);

router.post("/signin", requireSignin, signIn);

router.get("/token", getToken);

export default router;
