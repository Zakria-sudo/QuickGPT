import 'dotenv/config'
import express from "express"
import cors from "cors"
import connectDB from "./configs/db.js"
import userRouter from './routes/user.route.js'
import chatRouter from './routes/chat.route.js'

const app = express()

await connectDB();

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Server is live")
})
app.use("/api/user", userRouter)
app.use("/api/chat", chatRouter)

const PORT = process.env.PORT || '3000'
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})