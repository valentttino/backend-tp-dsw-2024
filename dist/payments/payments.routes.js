import { Router } from "express";
import { add, findAll, findOne, remove, update } from "./pay.controler.js";
export const orderRouter = Router();
orderRouter.get('/', findAll);
orderRouter.get('/:orderNumber', findOne);
orderRouter.post('/', add);
orderRouter.put('/:orderNumber', update);
orderRouter.delete('/:orderNumber', remove);
//# sourceMappingURL=payments.routes.js.map