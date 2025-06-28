import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Please login to access" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id).select("-password");

    if (!req.user) {
      return res.status(403).json({ message: "User not found" });
    }

    console.log("Authenticated: ", req.user.name);
    next();
  } catch (error) {
    res.status().json({ error: error.message });
  }
};
