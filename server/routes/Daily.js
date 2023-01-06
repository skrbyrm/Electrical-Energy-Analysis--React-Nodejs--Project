import express from "express";
import { DailyData } from "../controllers/Daily.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/daily/:ssno", verifyUser, DailyData);

export default router;
