import { OrderRepository } from "./payment.repository.js";
import { Order } from "./payment.entity.js";
const repository = new OrderRepository();
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const orderNumberSearch = req.params.orderNumber;
    const order = repository.findOne({ id: orderNumberSearch });
    if (!order) {
        return res.status(404).send({ message: 'Order not found' });
    }
    res.json(order);
}
function add(req, res) {
    const body = req.body;
    const orderNew = new Order(body.orderNumber, body.idEmployee, body.idCustomer, body.idMaterial, body.totalCost, body.orderDate);
    const order = repository.add(orderNew);
    return res.status(201).send(order);
}
function update(req, res) {
    let body = req.body;
    body.orderNumber = req.params.orderNumber;
    const order = repository.update(body);
    if (!order) {
        return res.status(404).send({ message: 'Order not found' });
    }
    res.status(200).send(order);
}
function remove(req, res) {
    const id = req.params.orderNumber;
    const order = repository.delete({ id });
    if (!order) {
        res.status(404).send({ message: 'Order not found' });
    }
    else {
        res.status(200).send({ message: 'Order deleted successfully' });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=payment.controler.js.map