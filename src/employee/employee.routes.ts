import { Router } from "express"
import {sanitizeEmployeeInput ,findAll, findOne, add, update, remove } from "./employee.controler.js"

export const employeeRouter = Router()

employeeRouter.get('/', findAll)
employeeRouter.get('/:id', findOne)
employeeRouter.post('/', sanitizeEmployeeInput, add)
employeeRouter.put('/:id', sanitizeEmployeeInput, update)
employeeRouter.delete('/:id', remove)