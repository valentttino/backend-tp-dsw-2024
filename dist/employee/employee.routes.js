import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./employee.controler.js";
export const employeeRouter = Router();
employeeRouter.get('/', findAll);
employeeRouter.get('/:id', findOne);
employeeRouter.post('/', add);
employeeRouter.put('/:id', update);
employeeRouter.delete('/:id', remove);
//# sourceMappingURL=employee.routes.js.map