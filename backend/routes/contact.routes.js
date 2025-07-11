import express from "express";
import {
  getAllMessages,
  submitContact,
} from "../controllers/connect.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/submit",  submitContact);
router.get("/", authMiddleware, getAllMessages);

export default router;
