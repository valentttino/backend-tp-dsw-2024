import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./customer.controler.js";
export const customerRouter = Router();
customerRouter.get('/', findAll);
customerRouter.get('/:id', findOne);
customerRouter.post('/', add);
customerRouter.put('/:id', update);
customerRouter.delete('/:id', remove);
//# sourceMappingURL=customer.routes.js.map