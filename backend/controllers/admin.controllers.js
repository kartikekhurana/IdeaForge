import { Idea } from "../models/idea.model.js";
import { Logs } from "../models/logs.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { Comment } from "../models/comment.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      throw new apiError(404, "no users found");
    }
    return res.status(200).json({
      success: true,
      message: "all users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "error while fetching the users",
    });
  }
};

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const fetchedUser = await User.findById(id);
    if (!fetchedUser) {
      throw new apiError(404, "invalid user");
    }
    return res.status(200).json({
      success: true,
      user: fetchedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong while fetching the user",
    });
  }
};

const deleteUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      throw new apiError(404, "user not found");
    }
    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "something went wrong while deleting the user",
    });
  }
};
const gettingallideas = async (req, res) => {
  try {
    const allIdeas = await Idea.find().populate({
      path: "owner",
      select: "fullname email",
    });

    if (allIdeas.length === 0) {
      throw new apiError(404, "no ideas found");
    }
    res.status(200).json({
      success: true,
      message: "all ideas fetched successfully",
      ideas: allIdeas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong while fetching the ideas",
    });
  }
};
const gettingIdeasById = async (req, res) => {
  try {
    const { id } = req.params;
    const particularIdea = await Idea.findById(id)
      .populate({
        path: "owner",
        select: "fullname , email",
      })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "fullname email",
        },
      });
    if (!particularIdea) {
      throw new apiError(404, "idea not found");
    }
    return res.status(200).json({
      success: true,
      message: "idea fetched successfully",
      idea: particularIdea,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong while fetching the idea",
    });
  }
};
const deleteIdeasById = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findByIdAndDelete(id);
    if (!idea) {
      throw new apiError(404, "idea not found");
    }
    return res.status(200).json({
      success: true,
      message: "idea deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete idea",
    });
  }
};
const updateIdeas = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findById(id);
    if (!idea) {
      throw new apiError(404, "Idea not found");
    }
    Object.keys(req.body).forEach((key) => {
      idea[key] = req.body[key];
    });
    await idea.save();
    return res.status(200).json({
      success: true,
      message: "idea updated by admin successfully",
      idea,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "error while updating the idea",
    });
  }
};
const getAllLogs = async (req, res) => {
  try {
    const count = await Logs.countDocuments();
    return res.status(200).json({
      success: true,
      count,
      message: "logs count fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch log count",
    });
  }
};
const getAllComments = async (req, res) => {
  try {
    const count = await Comment.countDocuments();
    return res.status(200).json({
      success: true,
      count,
      message: "comments count fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch comments count",
    });
  }
};

const getRecentActivity = async (req, res) => {
  try {
    const logs = await Logs.find()
      .populate("user", "email fullname")
      .sort({ createdAt: -1 })
      .limit(10);
    return res.status(200).json({
      success: true,
      logs,
      message: "recent activity fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong while fetching activity",
    });
  }
};

const getAnalyticsCharts = async (req, res) => {
  try {
    const groupByMonth = [
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: {
            $arrayElemAt: [
              [
                "",
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              "$_id",
            ],
          },
          count: 1,
        },
      },
      { $sort: { _id: 1 } },
    ];
    const [userStats, ideaStats, commentStats] = await Promise.all([
      User.aggregate(groupByMonth),
      Idea.aggregate(groupByMonth),
      Comment.aggregate(groupByMonth),
    ]);
    return res.status(200).json({
      success: true,
      analytics: {
        users: userStats,
        ideas: ideaStats,
        comments: commentStats,
      },
      message: "analytics fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error while fetching analytics data",
    });
  }
};

export {
  getAllUsers,
  getUsersById,
  deleteUsersById,
  gettingallideas,
  gettingIdeasById,
  updateIdeas,
  deleteIdeasById,
  getAllLogs,
  getAllComments,
  getRecentActivity,
  getAnalyticsCharts
};
