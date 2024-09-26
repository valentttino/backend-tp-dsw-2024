import { Router } from "express"
import { sanitizeCustomerInput, findAll, findOne, add, update, remove } from "./customer.controler.js"

export const customerRouter = Router()

customerRouter.get('/', findAll)
customerRouter.get('/:id', findOne)
customerRouter.post('/', sanitizeCustomerInput, add)
customerRouter.put('/:id', sanitizeCustomerInput, update)
customerRouter.delete('/:id', remove)