import express from "express"
import { createChat, deleteChat, getChat } from "../controllers/chat.controller.js"
import { authorizeUser } from "../middlewares/auth.middleware.js"

const chatRouter = express.Router()
chatRouter.post("/create",authorizeUser, createChat)
chatRouter.get("/get",authorizeUser, getChat)
chatRouter.delete("/delete", authorizeUser, deleteChat)


export default chatRouter