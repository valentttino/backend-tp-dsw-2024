import { PaymentRepository } from "./payment.repository.js";
const repository = new PaymentRepository();
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
}
async function findOne(req, res) {
    const idSearch = req.params.id;
    const payment = await repository.findOne({ id: idSearch });
    if (!payment) {
        return res.status(404).send({ message: 'Payment not found' });
    }
    res.json(payment);
}
async function add(req, res) {
    const body = req.body;
    const paymentNew = {
        paymentNumber: body.paymentNumber,
        orderNumber: body.orderNumber,
        amount: body.amount,
        orderDate: body.orderDate
    };
    const payment = await repository.add(paymentNew);
    return res.status(201).send(payment);
}
async function update(req, res) {
    let body = req.body;
    body.id = req.params.id;
    const payment = await repository.update(body.id, body);
    if (!payment) {
        return res.status(404).send({ message: 'Payment not found' });
    }
    res.status(200).send(payment);
}
async function remove(req, res) {
    const id = req.params.id;
    const payment = await repository.delete({ id });
    if (!payment) {
        res.status(404).send({ message: 'Payment not found' });
    }
    else {
        res.status(200).send({ message: 'Payment deleted successfully' });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=payment.controler.js.map