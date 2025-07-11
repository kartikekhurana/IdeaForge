import { apiError } from "../utils/apiError.js";
import { Idea } from "../models/idea.model.js";
import { Comment } from "../models/comment.model.js";
import { createLogs } from "../utils/createLog.js";

const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      throw new apiError(404, "content not found");
    }
    const idea = await Idea.findById(id);
    if (!idea) {
      throw new apiError(404, "Idea not found");
    }
    const duplicateComment = await Comment.findOne({
      content,
      idea: id,
      author: req.user._id,
    });
    if (duplicateComment) {
      throw new apiError(409, "duplicate comments not allowed");
    }
    const newComment = await Comment.create({
      content,
      idea: id,
      author: req.user._id,
    });
    idea.comments.push(newComment._id);
    await idea.save();

    await createLogs(req.user._id, "commented on this idea");
    await newComment.populate("author", "email");

    return res.status(200).json({
      success: true,
      message: "comment created successfully",
      newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "something went wrong while creating the comment",
    });
  }
};

const getCommentsbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const ideaExists = await Idea.findById(id);
    if (!ideaExists) {
      throw new apiError(404, "idea not found");
    }
    const comment = await Comment.find({ idea: id }).populate(
      "author",
      "email "
    );

    return res.status(200).send({
      success: true,
      message:
        comment.length === 0
          ? "No comments yet"
          : "Successfully fetched comments",
      comment,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message || "something went wrong while fetching comments",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new apiError(404, "comment not found");
    }
    await comment.deleteOne();
    res.status(200).json({
      success: true,
      message: "comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message || "something went wrong while deleting the comment",
    });
  }
};

export { createComment, getCommentsbyId, deleteComment };
