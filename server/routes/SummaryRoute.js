import express from "express";
import { getAllSummary_data } from "../controllers/Monthly.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/getAllSummary_data", verifyUser, getAllSummary_data);

export default router;
