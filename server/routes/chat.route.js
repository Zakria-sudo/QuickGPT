import express from "express"
import { createChat, deleteChat, getChat } from "../controllers/chat.controller.js"
import { authorizeUser } from "../middlewares/auth.middleware.js"
import { generateImg, generateMsg } from "../controllers/message.controller.js"

const chatRouter = express.Router()
chatRouter.post("/create",authorizeUser, createChat)
chatRouter.get("/get",authorizeUser, getChat)
chatRouter.delete("/delete", authorizeUser, deleteChat)

// chatRouter.post("/message", authorizeUser, generateMsg)
// chatRouter.post("/generate-image", authorizeUser, generateImg)


export default chatRouter