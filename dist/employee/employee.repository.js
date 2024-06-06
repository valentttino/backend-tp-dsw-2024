import { Employee } from "./employee.entity.js";
import { Order } from "../order/order.entity.js";
let employees = [
    new Employee('e123', '20680001117', '68000111', 'Luka Doncic', 'Rioja 1905', 'ldoncic@gmail.com', '3462343536', [
        new Order('1974', 'e123', 'c123', '74', 1800.0, new Date('2024-06-02')),
        new Order('1988', 'e123', 'c123', '22', 1200.0, new Date('2024-06-11'))
    ])
];
export class EmployeeRepository {
    findAll() {
        return employees;
    }
    findOne(item) {
        return employees.find(c => c.id === item.id);
    }
    add(item) {
        employees.push(item);
        return item;
    }
    update(item) {
        const employeeIdx = employees.findIndex((employee) => employee.id === item.id);
        if (employeeIdx !== -1) {
            employees[employeeIdx] = { ...employees[employeeIdx], ...item };
        }
        return employees[employeeIdx];
    }
    delete(item) {
        const deletedEmployee = employees.find(c => c.id === item.id);
        employees = employees.filter(c => c.id !== item.id);
        return deletedEmployee;
    }
}
//# sourceMappingURL=employee.repository.js.map