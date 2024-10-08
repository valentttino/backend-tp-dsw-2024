import { Router } from "express"
import { sanitizePaymentInput, findAll, findOne, add, update, remove } from "./payment.controler.js"

export const paymentRouter = Router()

paymentRouter.get('/', findAll)
paymentRouter.get('/:id', findOne)
paymentRouter.post('/', sanitizePaymentInput, add)
paymentRouter.put('/:id', sanitizePaymentInput, update)
paymentRouter.delete('/:id', remove)