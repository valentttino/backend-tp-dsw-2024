import { Payment } from "./payment.entity.js";
let payments = [
    new Payment('p2805', 'o100', 1500, new Date('2024-06-02'))
];
export class PaymentRepository {
    findAll() {
        return payments;
    }
    findOne(item) {
        return payments.find(o => o.paymentNumber === item.id);
    }
    add(item) {
        payments.push(item);
        return item;
    }
    update(item) {
        const paymentIdx = payments.findIndex((payment) => payment.paymentNumber === item.paymentNumber);
        if (paymentIdx !== -1) {
            payments[paymentIdx] = { ...payments[paymentIdx], ...item };
        }
        return payments[paymentIdx];
    }
    delete(item) {
        const deletedPayment = payments.find(o => o.paymentNumber === item.id);
        payments = payments.filter(o => o.paymentNumber !== item.id);
        return deletedPayment;
    }
}
//# sourceMappingURL=payment.repository.js.map