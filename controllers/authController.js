import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save user (password hashing handled by pre-save hook)
    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax"
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });
    
    res.json({
      message: "Logout successful"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};