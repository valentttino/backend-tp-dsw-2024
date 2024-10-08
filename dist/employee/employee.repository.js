import { Employee } from "./employee.entity.js";
export class EmployeeRepository {
    async findAll() {
        const employees = await Employee;
        return await employees.find().exec();
    }
    async findOne(item) {
        let employee = null;
        if (item.id) {
            employee = await Employee
                .findById(item.id);
        }
        else if (item.cuil) {
            employee = await Employee
                .findOne({ cuil: item.cuil });
        }
        return (employee || undefined);
    }
    async add(item) {
        const newItem = new Employee(item);
        const savedItem = await newItem.save();
        return savedItem;
    }
    async update(id, item) {
        return (await Employee.findOneAndUpdate({ id }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async delete(item) {
        const _id = item.id;
        return (await Employee.findOneAndDelete({ _id })) || undefined;
    }
}
//# sourceMappingURL=employee.repository.js.map