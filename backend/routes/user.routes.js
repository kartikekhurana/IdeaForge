import express from "express";
const router = express.Router();
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  refreshtokens,
  getUserStats,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", authMiddleware, getCurrentUser);
export default router;

router.post("/logout", logoutUser);

router.get("/refresh", refreshtokens);

router.get("/users/stats/:id", authMiddleware, getUserStats);
