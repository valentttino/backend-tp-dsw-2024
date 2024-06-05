import { Customer } from "./customer.entity.js";
let customers = [
    new Customer('c123', '38555222', 'Nicolas Zapata', 'San Luis 1489', 'nzapata@gmail.com', '3425556666')
];
export class CustomerRepository {
    findAll() {
        return customers;
    }
    findOne(item) {
        return customers.find(c => c.id === item.id);
    }
    add(item) {
        customers.push(item);
        return item;
    }
    update(item) {
        const customerIdx = customers.findIndex((customer) => customer.id === item.id);
        if (customerIdx !== -1) {
            customers[customerIdx] = { ...customers[customerIdx], ...item };
        }
        return customers[customerIdx];
    }
    delete(item) {
        const deletedCustomer = customers.find(c => c.id === item.id);
        customers = customers.filter(c => c.id !== item.id);
        return deletedCustomer;
    }
}
//# sourceMappingURL=customer.repository.js.map