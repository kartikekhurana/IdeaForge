import express from "express";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import {
  deleteIdeasById,
  deleteUsersById,
  getAllComments,
  getAllLogs,
  getAllUsers,
  getAnalyticsCharts,
  getRecentActivity,
  gettingallideas,
  gettingIdeasById,
  getUsersById,
  updateIdeas,
} from "../controllers/admin.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/admin/users", authMiddleware, isAdmin, getAllUsers);
router.get("/admin/users/:id", authMiddleware, isAdmin, getUsersById);
router.delete("/admin/users/:id", authMiddleware, isAdmin, deleteUsersById);
router.get("/admin/ideas", authMiddleware, isAdmin, gettingallideas);
router.get("/admin/ideas/:id", authMiddleware, isAdmin, gettingIdeasById);
router.patch("/admin/ideas/:id", authMiddleware, isAdmin, updateIdeas);
router.delete("/admin/ideas/:id", authMiddleware, isAdmin, deleteIdeasById);
router.get("/admin/logs", authMiddleware, isAdmin, getAllLogs);
router.get("/admin/comments", authMiddleware, isAdmin, getAllComments);
router.get("/admin/activity", authMiddleware, isAdmin, getRecentActivity);
router.get("/admin/analytics", authMiddleware, isAdmin, getAnalyticsCharts);

export default router;
