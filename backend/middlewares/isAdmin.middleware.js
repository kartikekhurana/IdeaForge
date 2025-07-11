import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      throw new apiError(404, "Unauthorized . User not found");
    }
    const user = await User.findById(userId);
    if (!user || !user.isAdmin) {
      throw new apiError(403, "Access denied , admins only");
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export { isAdmin };
