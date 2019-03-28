import express from "express";
import {
    getDefaultImageCoverById,
    getBasicVideoInfoById,
    updateVideo } from "../controllers/video";
import { requireAuth } from "../middlewares/auth";
import { isVideoOwner } from "../middlewares/ownership";

const router = express.Router();

// Video Routes

router.get("/video/basic/:id", getBasicVideoInfoById);

// Get Cover vidoe of an Image
router.get("/video/cover/default/:id", getDefaultImageCoverById);

router.put("/video/:id", requireAuth, isVideoOwner, updateVideo);

