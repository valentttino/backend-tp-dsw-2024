import { OrderRepository } from "./order.repository.js";
const repository = new OrderRepository();
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
}
async function findOne(req, res) {
    const idSearch = req.params.id;
    const order = await repository.findOne({ id: idSearch });
    if (!order) {
        return res.status(404).send({ message: 'Order not found' });
    }
    res.json(order);
}
async function add(req, res) {
    const body = req.body;
    const orderNew = {
        idEmployee: body.idEmployee,
        idCustomer: body.idCustomer,
        totalCost: body.totalCost,
        orderDate: body.orderDate,
        details: body.details
    };
    const order = await repository.add(orderNew);
    return res.status(201).send(order);
}
async function update(req, res) {
    let body = req.body;
    body.id = req.params.id;
    const order = await repository.update(body.id, body);
    if (!order) {
        return res.status(404).send({ message: 'Order not found' });
    }
    res.status(200).send(order);
}
async function remove(req, res) {
    const id = req.params.id;
    const order = await repository.delete({ id });
    if (!order) {
        res.status(404).send({ message: 'Order not found' });
    }
    else {
        res.status(200).send({ message: 'Order deleted successfully' });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=order.controler.js.map