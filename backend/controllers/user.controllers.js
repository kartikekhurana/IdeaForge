import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generatetokens.js";
import jwt from "jsonwebtoken";
import { Idea } from "../models/idea.model.js";
import { Comment } from "../models/comment.model.js";

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, username } = req.body;
    if (!fullname || !email || !password || !username) {
      throw new apiError(400, "all fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new apiError(409, "user already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      username,
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
    };
    return res.status(200).send({
      success: true,
      message: "User created successfully",
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      message: error.message || "something went wrong while creating user",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new apiError(400, "email or username is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new apiError(400, "invalid email or password");
    }
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      throw new apiError(400, "invalid email or password");
    }
    const isAdmin = user.isAdmin;
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });
    const userdata = {
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    if (isAdmin) {
      return res.status(200).json({
        success: true,
        message: "admin logged in succesfully",
        user: userdata,
      });
    }

    res.status(200).json({
      success: true,
      message: "user loggedin successfully",
      user: userdata,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong while logging in",
    });
  }
};

const getCurrentUser = async (req, res) => {
  const currentUser = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  if (!currentUser) {
    throw new apiError(400, "user not found");
  }
  return res.status(200).json({
    success: true,
    currentUser,
  });
};
const logoutUser = async (req, res) => {
  try {
   res.clearCookie("accessToken", {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
});
   res.clearCookie("refreshToken", {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
});
    return res.status(200).json({
      success: true,
      message: "user logged out succesfully",
    });
  } catch (error) {
    throw new apiError(500, "error during logout");
  }
};

const refreshtokens = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      throw new apiError(401, "no token found");
    }
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const newAccesstoken = generateAccessToken(decoded._id);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", newAccesstoken, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });
    return res.status(200).json({ success: true, message: "Token refreshed" });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Refresh token invalid or expired",
    });
  }
};

const getUserStats = async (req, res) => {
  try {
    const { id } = req.params;
    const ideas = await Idea.countDocuments({ owner: id });
    const comments = await Comment.countDocuments({ author: id });
    return res.status(200).json({
      success: true,
      ideas,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  refreshtokens,
  getUserStats,
};
