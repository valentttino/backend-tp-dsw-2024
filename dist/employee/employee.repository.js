import { Employee } from "./employee.entity.js";
let employees = [
    new Employee('a23', '20680001117', '68000111', 'Luka Doncic', 'Rioja 1905', 'ldoncic@gmail.com', '3462343536')
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