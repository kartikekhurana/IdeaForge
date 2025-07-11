import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsbyId,
} from "../controllers/comment.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/:id", authMiddleware, createComment);
router.get("/:id", authMiddleware, getCommentsbyId);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
