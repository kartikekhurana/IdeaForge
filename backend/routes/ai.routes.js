import express from "express";
import { generateIdeas } from "../controllers/ai.controllers.js";
const router = express.Router();

router.post("/generate", generateIdeas);

export default router;
