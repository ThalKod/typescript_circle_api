import express, { Router }  from "express";
import { signUp } from "../controllers/auth";

const router:Router = express.Router();

// Index Routes
router.post("/signup", signUp);

export default router;
