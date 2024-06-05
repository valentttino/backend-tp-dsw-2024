import express from 'express';
import { Customer } from './customer/customer.entity.js';
import { CustomerRepository } from './customer/customer.repository.js';
const app = express();
app.use(express.json());
const repository = new CustomerRepository();
app.get('/api/customers', (req, res) => {
    res.json(repository.findAll());
});
app.get('/api/customers/:id', (req, res) => {
    const idSearch = req.params.id;
    const customer = repository.findOne({ id: idSearch });
    if (!customer) {
        return res.status(404).send({ message: 'Customer not found' });
    }
    res.json(customer);
});
app.post('/api/customers', (req, res) => {
    const body = req.body;
    const customerNew = new Customer(body.id, //por ahora, la id es ingresada por el usuario
    body.dni, body.name, body.address, body.email, body.phone);
    const customer = repository.add(customerNew);
    return res.status(201).send(customer);
});
app.delete('/api/customers/:id', (req, res) => {
    const id = req.params.id;
    const customer = repository.delete({ id });
    if (!customer) {
        res.status(404).send({ message: 'Customer not found' });
    }
    else {
        res.status(200).send({ message: 'Customer deleted successfully' });
    }
});
app.put('/api/customers/:id', (req, res) => {
    let body = req.body;
    body.id = req.params.id;
    const customer = repository.update(body);
    if (!customer) {
        return res.status(404).send({ message: 'Customer not found' });
    }
    res.status(200).send(customer);
});
app.listen(3006, () => {
    console.log('Server running on http://localhost:3006/');
});
//# sourceMappingURL=app.js.map