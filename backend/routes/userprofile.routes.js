import express from "express";
import { getprofile } from "../controllers/userprofiles.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/user/profile", authMiddleware, getprofile);


export default router;
