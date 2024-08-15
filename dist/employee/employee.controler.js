import { EmployeeRepository } from "./employee.repository.js";
const repository = new EmployeeRepository();
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
}
async function findOne(req, res) {
    const idSearch = req.params.id;
    const employee = await repository.findOne({ id: idSearch });
    if (!employee) {
        return res.status(404).send({ message: 'Employee not found' });
    }
    res.json(employee);
}
async function add(req, res) {
    const body = req.body;
    const employeeNew = {
        cuil: body.cuil,
        dni: body.dni,
        name: body.name,
        address: body.address,
        email: body.email,
        phone: body.phone,
    };
    const employee = await repository.add(employeeNew);
    return res.status(201).send(employee);
}
async function update(req, res) {
    let body = req.body;
    body.id = req.params.id;
    const employee = await repository.update(body.id, body);
    if (!employee) {
        return res.status(404).send({ message: 'Employee not found' });
    }
    res.status(200).send(employee);
}
async function remove(req, res) {
    const id = req.params.id;
    const employee = await repository.delete({ id });
    if (!employee) {
        res.status(404).send({ message: 'Employee not found' });
    }
    else {
        res.status(200).send({ message: 'Employee deleted successfully' });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=employee.controler.js.map