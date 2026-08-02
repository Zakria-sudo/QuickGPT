import express from "express"
import { getPublishedImgs, getUser, loginUser, registerUser } from "../controllers/user.controller.js";
import { authorizeUser } from "../middlewares/auth.middleware.js";

const userRouter = express.Router()

userRouter.post('/register',registerUser )
userRouter.post('/login', loginUser)
userRouter.get('/data', authorizeUser, getUser)
userRouter.get('/published-images', getPublishedImgs)

export default userRouter;