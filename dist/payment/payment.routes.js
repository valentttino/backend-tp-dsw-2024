import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./payment.controler.js";
export const paymentRouter = Router();
paymentRouter.get('/', findAll);
paymentRouter.get('/:id', findOne);
paymentRouter.post('/', add);
paymentRouter.put('/:id', update);
paymentRouter.delete('/:id', remove);
//# sourceMappingURL=payment.routes.js.map