import 'dotenv/config'
import express from "express"
import cors from "cors"
import connectDB from "./configs/db.js"
import userRouter from './routes/user.route.js'
import chatRouter from './routes/chat.route.js'
import multer from 'multer'
import messageRouter from './routes/message.route.js'
import creditRouter from './routes/credit.route.js'
import { stripeWebhook } from './controllers/webhooks.js'

const app = express()

await connectDB();

app.post("/api/stripe", express.raw({type:"application/json"}), stripeWebhook)

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Server is live")
})
app.use("/api/user", userRouter)
app.use("/api/chat", chatRouter)
app.use("/api/message", messageRouter)
app.use("/api/credit", creditRouter)

const PORT = process.env.PORT || '3000'
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})