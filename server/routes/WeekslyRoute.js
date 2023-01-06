import express from "express";
import { WeekslyData } from "../controllers/Weekly.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/weeksly/:ssno", verifyUser, WeekslyData);

export default router;
