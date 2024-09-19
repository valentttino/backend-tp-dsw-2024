import { Router } from "express"
import { loginUser } from './login.controler'

export const loginRouter = Router()

loginRouter.post('/', loginUser)