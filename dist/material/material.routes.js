import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./material.controler.js";
export const materialRouter = Router();
materialRouter.get('/', findAll);
materialRouter.get('/:id', findOne);  
materialRouter.post('/', add);
materialRouter.put('/:id', update);
materialRouter.delete('/:id', remove);
