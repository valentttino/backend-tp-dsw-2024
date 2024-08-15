import { Payment } from "./payment.entity.js";
export class PaymentRepository {
    async findAll() {
        const payment = await Payment;
        return await payment.find().exec();
    }
    async findOne(item) {
        const paymentById = await Payment
            .findById(item.id);
        return (paymentById || undefined);
    }
    async add(item) {
        const newItem = new Payment(item);
        const savedItem = await newItem.save();
        return savedItem;
    }
    async update(id, item) {
        return (await Payment.findOneAndUpdate({ id }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async delete(item) {
        const _id = item.id;
        return (await Payment.findOneAndDelete({ _id })) || undefined;
    }
}
//# sourceMappingURL=payment.repository.js.map