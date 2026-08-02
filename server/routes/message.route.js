import express from "express"
import { authorizeUser } from "../middlewares/auth.middleware.js"
import { generateImg, generateMsg } from "../controllers/message.controller.js"

const messageRouter = express.Router()
messageRouter.post("/text",authorizeUser,generateMsg)
messageRouter.post("/image",authorizeUser,generateImg)

export default messageRouter