import express from "express"
import { getPlans, purchasePlan } from "../controllers/transaction.controller.js"
import { authorizeUser } from "../middlewares/auth.middleware.js"

const creditRouter = express.Router()

creditRouter.get('/plan', getPlans)
creditRouter.post('/purchase',authorizeUser, purchasePlan)

export default creditRouter