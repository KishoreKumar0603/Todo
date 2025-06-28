import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    return res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Wrong credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    const { password: userPassword, ...userDetails } = user.toObject();

    res.json({
      message: "Login successful",
      user: userDetails,
      token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Both fields are required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ error: error.message });
  }
};
