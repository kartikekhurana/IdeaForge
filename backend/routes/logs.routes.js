import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUserLogs, logsForIdea } from "../controllers/logs.controller.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, isAdmin, getUserLogs);
router.get("/idea/:ideaId", authMiddleware, isAdmin, logsForIdea);

export default router;
