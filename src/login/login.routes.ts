import { Router } from "express"
import { loginUser } from './login.controler.js'

export const loginRouter = Router()

loginRouter.post('/', loginUser)