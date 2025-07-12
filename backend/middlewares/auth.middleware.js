import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(new apiError(401, "Unauthorized: No token provided"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new apiError(401, "Invalid or expired token"));
  }
};