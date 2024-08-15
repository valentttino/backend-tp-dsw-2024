import { Customer } from "./customer.entity.js";
export class CustomerRepository {
    async findAll() {
        const customers = await Customer;
        return await customers.find().exec();
    }
    async findOne(item) {
        const customerById = await Customer
            .findById(item.id);
        return (customerById || undefined);
    }
    async add(item) {
        const newItem = new Customer(item);
        const savedItem = await newItem.save();
        return savedItem;
    }
    async update(id, item) {
        return (await Customer.findOneAndUpdate({ id }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async delete(item) {
        const _id = item.id;
        return (await Customer.findOneAndDelete({ _id })) || undefined;
    }
}
//# sourceMappingURL=customer.repository.js.map