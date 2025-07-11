import { apiError } from "../utils/apiError.js";
import { Idea } from "../models/idea.model.js";
import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import { createLogs } from "../utils/createLog.js";

const createIdea = async (req, res) => {
  try {
    const { title, description, category, stage } = req.body;
    if (!title || !description || !category || !stage) {
      throw new apiError(400, "All fields are required");
    }
    const userId = req.user._id;

    const newIdea = await Idea.create({
      title,
      description,
      category,
      stage,
      owner: userId,
    });
    await createLogs(req.user._id, "created a new idea");

    return res.status(200).json({
      success: true,
      message: "Idea created successfully",
      idea: newIdea,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong while creating the user",
    });
  }
};

const getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().populate({
      path: "owner",
      select: "fullname email",
    });
    if (ideas.length === 0) {
      throw new apiError(404, "No ideas found");
    }
    return res.status(200).json({
      success: true,
      ideas,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "errow while fetching the ideas",
    });
  }
};

const getIdeaById = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findById(id).populate("owner", "fullname,email");
    if (!idea) {
      throw new apiError(404, "No ideas found");
    }
    return res.status(200).json({
      success: true,
      message: "fetched idea successfully",
      idea,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};
const updateIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findById(id);

    if (!idea) {
      return res.status(403).json({
        success: false,
        message: "no fields provided to update",
      });
    }
    if (idea.owner.toString() !== req.user._id.toString()) {
      throw new apiError(403, "unauthorized to update the idea");
    }

    const { title, description, category, stage } = req.body;

    if (!title && !description && !category && !stage) {
      throw new apiError(400, "no fields provided for update");
    }
    if (title) idea.title = title;
    if (description) idea.description = description;
    if (category) idea.category = category;
    if (stage) idea.stage = stage;

    await idea.save();
    return res.status(200).json({
      success: true,
      message: "idea updated successfully",
      idea,
    });
  } catch (error) {
    console.error("❌ Update Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong while updating idea",
    });
  }
};
const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findById(id);
    if (!idea) {
      throw new apiError(404, "User not found");
    }
    if (idea.owner.toString() !== req.user._id.toString()) {
      throw new apiError(403, "unauthorized to delete the user");
    }
    await Idea.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "idea deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "error while deleting the idea",
    });
  }
};

const ideawithComments = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findById(id).populate("owner", "email,password");
    if (!idea) {
      throw new apiError(404, "idea not found");
    }
    const comment = await Comment.find({ idea: id }).populate(
      "author",
      "email"
    );
    if (!comment) {
      throw new apiError(404, "comment not found");
    }
    return res.status(200).json({
      success: true,
      message: "ideas page ",
      idea,
      comment,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message:
        error.message || "something went wrong while fetching the idea page",
    });
  }
};
const ideatoggle = async (req, res) => {
  try {
    const ideaId = req.params.id;
    const userId = req.user._id;

    const idea = await Idea.findById(ideaId);
    if (!idea) {
      throw new apiError(404, "idea not found");
    }
    const user = await User.findById(userId);
    const alreadyFavourite = user.favourites.includes(ideaId);
    if (alreadyFavourite) {
      user.favourites = user.favourites.filter(
        (favId) => favId.toString() !== ideaId
      );
    } else {
      user.favourites.push(ideaId);
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: alreadyFavourite
        ? "Idea removed from favourites"
        : "Idea added to favourites",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "something went wrong while toggling favourites",
    });
  }
};

export {
  createIdea,
  getAllIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  ideawithComments,
  ideatoggle,
};
