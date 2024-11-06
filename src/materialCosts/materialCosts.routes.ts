import { Router } from "express"
import { sanitizeMaterialCostsInput, findAll, findOne, add, update, remove } from "./materialCosts.controler.js"

export const materialCostsRouter = Router()

materialCostsRouter.get('/', findAll)
materialCostsRouter.get('/:id', findOne)
materialCostsRouter.post('/', sanitizeMaterialCostsInput, add)
materialCostsRouter.put('/:id', sanitizeMaterialCostsInput, update)
materialCostsRouter.delete('/:id', remove)