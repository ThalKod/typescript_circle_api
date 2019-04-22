import express from "express";

import { requireAuth } from "../middlewares/auth";
import {
    addCommentToVideo,
    getCommentCountOfVideo,
    getVideoComment,
    addReplyToCommentById
} from "../controllers/comment";
const router = express.Router();


// Comment Route

// Add comment to a video
router.post("/comment/video/:id", requireAuth, addCommentToVideo);

// Get total number comments of a video
router.get("/comment/count/video/:id", getCommentCountOfVideo);

// Get all comments of a videos
router.get("/comment/video/:id", getVideoComment);

router.post("/comment/reply/:id", requireAuth, addReplyToCommentById);


export default router;




