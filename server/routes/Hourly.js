import express from "express";
import { HourlyData } from "../controllers/Hourly.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/hourly/:ssno", verifyUser, HourlyData);

export default router;
