import crypto from "crypto";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/sendGmail.js";
import bcrypt from "bcryptjs";

const forgotPassword = async (req, res) => {
  //recieve a email
  const { email } = req.body;
  if (!email) {
    throw new apiError(404, "email is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new apiError(400, "user not found");
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 1000 * 60 * 10;
  await user.save();
  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  await sendEmail(
    user.email,
    "Reset your password",
    `<p>Click the link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`
  );

  return res.status(200).json({
    success: true,
    message: "Reset password email sent",
  });
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token || !password) {
      throw new apiError(400, "token and password are required");
    }
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      throw new apiError(404, "user not found");
    }
    {
      user.password = await bcrypt.hash(password, 10);
    }
    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpire = undefined),
      await user.save();
    return res.status(200).json({
      success: true,
      message: "password reset succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "something went wrong while reseting the password",
    });
  }
};

export { forgotPassword, resetPassword };
