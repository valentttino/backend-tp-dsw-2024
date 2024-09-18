import { Router } from "express";
import { add, findAll, findOne, remove, update } from "./order.controler.js";
export const orderRouter = Router();
orderRouter.get('/', findAll);
orderRouter.get('/:id', findOne);
orderRouter.post('/', add);
orderRouter.put('/:id', update);
orderRouter.delete('/:id', remove);
//# sourceMappingURL=order.routes.js.map