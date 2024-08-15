import { CustomerRepository } from "./customer.repository.js";
const repository = new CustomerRepository();
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
}
async function findOne(req, res) {
    const idSearch = req.params.id;
    const customer = await repository.findOne({ id: idSearch });
    if (!customer) {
        return res.status(404).send({ message: 'Customer not found' });
    }
    res.json(customer);
}
async function add(req, res) {
    const body = req.body;
    const customerNew = {
        dni: body.dni,
        name: body.name,
        address: body.address,
        email: body.email,
        phone: body.phone
    };
    const customer = await repository.add(customerNew);
    return res.status(201).send(customer);
}
async function update(req, res) {
    let body = req.body;
    body.id = req.params.id;
    const customer = await repository.update(body.id, body);
    if (!customer) {
        return res.status(404).send({ message: 'Customer not found' });
    }
    res.status(200).send(customer);
}
async function remove(req, res) {
    const id = req.params.id;
    const customer = await repository.delete({ id });
    if (!customer) {
        res.status(404).send({ message: 'Customer not found' });
    }
    else {
        res.status(200).send({ message: 'Customer deleted successfully' });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=customer.controler.js.map