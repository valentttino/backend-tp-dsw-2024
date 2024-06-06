import { Repository } from "../shared/repository.js"
import { Employee } from "./employee.entity.js"
import { Order } from "../order/order.entity.js"

let employees = [
    new Employee(
        'e123',
        '20680001117',
        '68000111',
        'Luka Doncic',
        'Rioja 1905',
        'ldoncic@gmail.com',
        '3462343536',
        [
            new Order(
                '1974',
                'e123',
                'c123',
                '74',
                1800.0,
                new Date('2024-06-02')
            ),
            new Order(
                '1988',
                'e123',
                'c123',
                '22',
                1200.0,
                new Date('2024-06-11')
            )
        ]
    )
]

export class EmployeeRepository implements Repository<Employee>{

    public findAll(): Employee[] | undefined {
        return employees
    }

    public findOne(item: { id: string; }): Employee | undefined {
        return employees.find(c => c.id === item.id)
    }

    public add(item: Employee): Employee | undefined {
        employees.push(item)
        return item
    }

    public update(item: Employee): Employee | undefined {
        const employeeIdx = employees.findIndex((employee) => employee.id === item.id)

        if (employeeIdx !== -1) {
          employees[employeeIdx] = { ...employees[employeeIdx], ...item }
        }
        return employees[employeeIdx]
    }

    public delete(item: { id: string; }): Employee | undefined {
        const deletedEmployee = employees.find(c => c.id === item.id)
        employees = employees.filter(c => c.id !== item.id)
        return deletedEmployee
    }
}