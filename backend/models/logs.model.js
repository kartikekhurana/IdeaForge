import mongoose from "mongoose";

const logsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    idea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Logs = new mongoose.model("Logs", logsSchema);
