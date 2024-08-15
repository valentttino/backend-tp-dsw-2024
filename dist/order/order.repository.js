import { Order } from "./order.entity.js";
export class OrderRepository {
    async findAll() {
        const orders = await Order;
        return await orders.find().exec();
    }
    async findOne(item) {
        const orderById = await Order
            .findById(item.id);
        return (orderById || undefined);
    }
    async add(item) {
        const newItem = new Order(item);
        const savedItem = await newItem.save();
        return savedItem;
    }
    async update(id, item) {
        return (await Order.findOneAndUpdate({ id }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async delete(item) {
        const _id = item.id;
        return (await Order.findOneAndDelete({ _id })) || undefined;
    }
}
//# sourceMappingURL=order.repository.js.map