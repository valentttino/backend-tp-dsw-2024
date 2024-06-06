import { Repository } from "../shared/repository.js"
import { Order } from "./order.entity.js"

let orders = [
    new Order(
        '1974',
        'e123',
        'c123',
        '74',
        1800.0,             // float
        new Date('2024-06-02')          //date
    )
]

export class OrderRepository implements Repository<Order>{

    public findAll(): Order[] | undefined {
        return orders    
    }

    public findOne(item: { id: string }): Order | undefined {
        return orders.find(o => o.orderNumber === item.id)    
    }

    public add(item: Order): Order | undefined {
        orders.push(item)
        return item    
    }

    public update(item: Order): Order | undefined {
        const orderIdx = orders.findIndex((order) => order.orderNumber === item.orderNumber)

        if (orderIdx !== -1){
            orders[orderIdx] = {...orders[orderIdx], ...item}
        }
        return orders[orderIdx]
    }

    public delete(item: { id: string }): Order | undefined {
        const deletedOrder = orders.find(o => o.orderNumber === item.id)
        orders = orders.filter(o => o.orderNumber !== item.id)
        return deletedOrder    
    }
}

