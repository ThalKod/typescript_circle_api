import express, { Router } from "express";
import { Video, IVideo} from "../models/VIdeo";
import { requireAuth } from "../middlewares/auth";
import { saveVideo }  from "../controllers/upload";

const router:Router = express.Router();

router.post("/upload/video", requireAuth, saveVideo);

export default router;
