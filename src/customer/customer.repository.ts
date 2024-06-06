import { Order } from "../order/order.entity.js"
import { Repository } from "../shared/repository.js"
import { Customer } from "./customer.entity.js"

let customers = [
    new Customer(
        'c123',
        '38555222',
        'Nicolas Zapata',
        'San Luis 1489',
        'nzapata@gmail.com',
        '3425556666',
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

export class CustomerRepository implements Repository<Customer>{

    public findAll(): Customer[] | undefined {
        return customers
    }

    public findOne(item: { id: string; }): Customer | undefined {
        return customers.find(c => c.id === item.id)
    }

    public add(item: Customer): Customer | undefined {
        customers.push(item)
        return item
    }

    public update(item: Customer): Customer | undefined {
        const customerIdx = customers.findIndex((customer) => customer.id === item.id)

        if (customerIdx !== -1) {
          customers[customerIdx] = { ...customers[customerIdx], ...item }
        }
        return customers[customerIdx]
    }

    public delete(item: { id: string; }): Customer | undefined {
        const deletedCustomer = customers.find(c => c.id === item.id)
        customers = customers.filter(c => c.id !== item.id)
        return deletedCustomer
    }
}