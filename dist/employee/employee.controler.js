import { EmployeeRepository } from "./employee.repository.js";
import { Employee } from "./employee.entity.js";
const repository = new EmployeeRepository();
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const idSearch = req.params.id;
    const employee = repository.findOne({ id: idSearch });
    if (!employee) {
        return res.status(404).send({ message: 'Employee not found' });
    }
    res.json(employee);
}
function add(req, res) {
    const body = req.body;
    const employeeNew = new Employee(body.id, //por ahora, la id es ingresada por el usuario
    body.dni, body.cuil, body.name, body.address, body.email, body.phone);
    const employee = repository.add(employeeNew);
    return res.status(201).send(employee);
}
function update(req, res) {
    let body = req.body;
    body.id = req.params.id;
    const employee = repository.update(body);
    if (!employee) {
        return res.status(404).send({ message: 'Employee not found' });
    }
    res.status(200).send(employee);
}
function remove(req, res) {
    const id = req.params.id;
    const employee = repository.delete({ id });
    if (!employee) {
        res.status(404).send({ message: 'Employee not found' });
    }
    else {
        res.status(200).send({ message: 'Employee deleted successfully' });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=employee.controler.js.map