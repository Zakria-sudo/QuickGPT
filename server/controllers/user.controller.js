import userModel from "../models/user.model";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
async function registerUser(req, res) {
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
    return res.json({ message: error, success: false });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const ismatched = await bcrypt.compare(password, user.password);
      if (ismatched) {
        const token = generateToken(user._id);
        return res
          .status(200)
          .json({
            success: true,
            token,
            message: "User logged in successfully",
          });
      }
    }
    return res.status(203).json({success:false, message: "Wrong password" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

async function getUser(req,res){
    try {
        const user = req.user
        return res.json({success:true, user})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}


module.exports = {registerUser,loginUser}