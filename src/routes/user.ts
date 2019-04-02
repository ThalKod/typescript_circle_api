import express, { Router } from "express";

import { requireAuth } from "../middlewares/auth";
import {
    getUser,
    getVideoCountByUserId,
    getSubscribersCountByUserId,
    getUserNameById } from "../controllers/user";

const router: Router = express.Router();

// User Routes

router.get("/user/me", requireAuth, getUser);

// get video count of user
router.get("/user/:id/video/count", getVideoCountByUserId);

// get subscribers count of user
router.get("/user/:id/subscribers/count", getSubscribersCountByUserId);

router.get("/user/:id/name", getUserNameById);

export default router;


