import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export async function authorizeUser(req, res, next) {
  let token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    req.user = user; 
    next();
  } catch (error) {}
}

