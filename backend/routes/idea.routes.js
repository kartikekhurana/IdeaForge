import express from "express";
import {
  createIdea,
  deleteIdea,
  getAllIdeas,
  getIdeaById,
  ideatoggle,
  ideawithComments,
  updateIdea,
} from "../controllers/idea.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createIdea);
router.get("/", authMiddleware, getAllIdeas);
router.get("/:id", authMiddleware, getIdeaById);
router.post("/:id", authMiddleware, updateIdea);
router.delete("/:id", authMiddleware, deleteIdea);
router.get("/profile/:id", authMiddleware, ideawithComments);
router.post("/:id/favourite",authMiddleware,ideatoggle)
export default router;
