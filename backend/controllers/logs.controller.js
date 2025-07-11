import { Logs } from "../models/logs.model.js";

const getUserLogs = async (req, res) => {
  try {
    const logs = Logs.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "fetched the logs successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong while fetching the logs",
    });
  }
};
const logsForIdea = async (req, res) => {
  try {
    const { id :ideaId } = req.params;
    const logs = await Logs.find({ idea: ideaId })
      .populate("user", "fullname email")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while fetching idea logs",
    });
  }
};

export { getUserLogs, logsForIdea };
