import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { Idea } from "../models/idea.model.js";

const getprofile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("fullname username email ");
    if (!user) {
      throw new apiError(404, "user not found");
    }
    const idea = await Idea.find({ owner: userId }).select("title stage");
    if (!idea) {
      throw new apiError(404, "idea not found");
    }
    return res.status(200).send({
      success: true,
      message: "user profile fetched successfully",
      user,
      idea,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        error.message || "something went wrong while fetching the user profile",
    });
  }
};

export { getprofile };
