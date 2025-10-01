import bcryptjs from "bcryptjs";
import crypto from "crypto"

import { User } from "../models/userModel.js";
import { generatedJWTandSetCookie } from "../utils/generateJWTandSetCookie.js";
import { sendResetPasswordEmail, sendPasswordResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import { envConfig } from "../config/envConfig.js";

export const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const verificationTokenExpiresAt = Date.now() + 5 * 60 * 60 * 1000; // 5 hour

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt,
    });

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to create user",
      });
    }

    generatedJWTandSetCookie(newUser._id, res);

    // TODO: if this function fails what to do? Handle that case
    // await sendVerificationEmail(newUser.email, newUser.verificationToken);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;

  if (!verificationCode) {
    return res.status(400).json({
      success: false,
      message: "Verification code is required",
    });
  }

  try {
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    // TODO: if this function fails what to do? Handle that case
    await sendWelcomeEmail(user.email, user.username);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email address before logging in",
        requiresVerification: true,
      });
    }

    generatedJWTandSetCookie(user._id, res);

    user.lastLogin = new Date();
    await user.save()

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const signOutUser = async (req, res) => {
  await res.clearCookie("token", {
    httpOnly: true,
    secure: envConfig.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Signed out successfully",
  });
};

export const forgetPassword = async (req, res) => {
  // Implementation for password reset
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email not found!"
    })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with this email not found"
      })
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex")

    const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetPasswordToken
    user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt

    await user.save()

    const resetPasswordLink = `${envConfig.FRONTEND_BASE_URL}/reset-password/${resetPasswordToken}`
    // await sendResetPasswordEmail(user.email, resetPasswordLink)

    return res.status(200).json({
      success: true,
      message: "Reset password email sent successfully"
    })

  } catch (error) {
    console.error("Error sending reset password email: ", error.message)
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    })
  }
}

export const resetPassword = async (req, res) => {
  const token = req.params.token
  const { password } = req.body

  if (!token || !password) {
    return res.status(400).json({
      success: false,
      message: "Token and password are required"
    })
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token"
      })
    }

    user.password = await bcryptjs.hash(password, 10)
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpiresAt = undefined

    await user.save()

    // await sendPasswordResetSuccessEmail(user.email)

    return res.status(200).json({
      success: true,
      message: "Password reset successfully"
    })

  } catch (error) {
    console.error("Error resetting password: ", error.message)
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    })
  }
}

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "User found",
      user: {
        ...user._doc,
        password: undefined,
      }
    })
  } catch (error) {
    console.error("Error checking authentication:", error)
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    })
  }
}