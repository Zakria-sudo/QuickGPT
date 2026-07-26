import express from "express"
import { getUser, loginUser, registerUser } from "../controllers/user.controller.js";
import { authorizeUser } from "../middlewares/auth.middleware.js";

const userRouter = express.Router()

userRouter.post('/register',registerUser )
userRouter.post('/loginUser', loginUser)
userRouter.get('/data', authorizeUser, getUser)

export default userRouter;