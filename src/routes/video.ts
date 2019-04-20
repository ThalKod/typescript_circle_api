import express from "express";
import {
    getDefaultImageCoverById,
    getBasicVideoInfoById,
    updateVideo,
    getRecommended,
    getVideos,
    getVideosListByUserId,
    getSimilarVideosById,
    getVideoById,
    searchVideosByText,
    addViewByVideoId
} from "../controllers/video";
import { requireAuth } from "../middlewares/auth";
import { isVideoOwner } from "../middlewares/ownership";

const router = express.Router();

// Video Routes

router.get("/video/basic/:id", getBasicVideoInfoById);

// Get Cover video of an Image
router.get("/video/cover/default/:id", getDefaultImageCoverById);

// For now we just fetch the eight most watched video... as recommended
router.get("/video/list/recommended/", getRecommended);

router.get("/video/list/user/:id", getVideosListByUserId);

router.get("/video/list", getVideos); // With /video/list?limit=10&offset=5

router.get("/video/:id/similar", getSimilarVideosById);

router.get("/video/:id", getVideoById);

router.put("/video/:id", requireAuth, isVideoOwner, updateVideo);

router.post("/video/search", searchVideosByText);

router.post("/video/:id/view", addViewByVideoId);

export default router;
