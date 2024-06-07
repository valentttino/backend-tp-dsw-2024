import { Order } from "./pay.entity.js";
let orders = [
    new Order('1974', 'e123', 'c123', '74', 1800.0, // float
    new Date('2024-06-02') //date
    )
];
export class OrderRepository {
    findAll() {
        return orders;
    }
    findOne(item) {
        return orders.find(o => o.orderNumber === item.id);
    }
    add(item) {
        orders.push(item);
        return item;
    }
    update(item) {
        const orderIdx = orders.findIndex((order) => order.orderNumber === item.orderNumber);
        if (orderIdx !== -1) {
            orders[orderIdx] = { ...orders[orderIdx], ...item };
        }
        return orders[orderIdx];
    }
    delete(item) {
        const deletedOrder = orders.find(o => o.orderNumber === item.id);
        orders = orders.filter(o => o.orderNumber !== item.id);
        return deletedOrder;
    }
}
//# sourceMappingURL=pay.repository.js.map