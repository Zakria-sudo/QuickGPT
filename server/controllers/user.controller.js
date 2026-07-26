import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const isAlreadyExists = await userModel.findOne({ email });
    if (isAlreadyExists) {
      return res.status(409).json({
        message: "User already Exists",
      });
    }
    const user = await userModel.create({ name, email, password });
    const token = generateToken(user._id);
    return res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      token,
      message: "User logged in successfully",
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export async function getUser(req,res){
    try {
        const user = req.user
        return res.json({success:true, user})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

