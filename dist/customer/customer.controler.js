import { CustomerRepository } from "./customer.repository.js";
import { Customer } from "./customer.entity.js";
const repository = new CustomerRepository();
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const idSearch = req.params.id;
    const customer = repository.findOne({ id: idSearch });
    if (!customer) {
        return res.status(404).send({ message: 'Customer not found' });
    }
    res.json(customer);
}
function add(req, res) {
    const body = req.body;
    const customerNew = new Customer(body.id, //por ahora, la id es ingresada por el usuario
    body.dni, body.name, body.address, body.email, body.phone, body.orders);
    const customer = repository.add(customerNew);
    return res.status(201).send(customer);
}
function update(req, res) {
    let body = req.body;
    body.id = req.params.id;
    const customer = repository.update(body);
    if (!customer) {
        return res.status(404).send({ message: 'Customer not found' });
    }
    res.status(200).send(customer);
}
function remove(req, res) {
    const id = req.params.id;
    const customer = repository.delete({ id });
    if (!customer) {
        res.status(404).send({ message: 'Customer not found' });
    }
    else {
        res.status(200).send({ message: 'Customer deleted successfully' });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=customer.controler.js.map