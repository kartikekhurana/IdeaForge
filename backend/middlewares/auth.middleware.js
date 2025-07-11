import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

export const authMiddleware = (req, res, next) => {

  const token = req.cookies.accessToken;
  if (!token) {

    throw new apiError(409, "unauthorized user");
  }
  try {

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {

    throw new apiError(401, "invalid or expired token");
  }
};
