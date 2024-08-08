import { Repository } from "../shared/repository.js"
import { Order, IOrder } from "./order.entity.js"

export class OrderRepository implements Repository<IOrder>{

    public async findAll(): Promise<IOrder[] | undefined> {
        const orders = await Order
        return await orders.find().exec()    
    }

    public async findOne(item: { id: string }): Promise<IOrder | undefined> {
        const orderById = await Order
            .findById(item.id)
        return (orderById || undefined)    
    }

    public async add(item: IOrder): Promise<IOrder | undefined> {
        const newItem = new Order(item)
        const savedItem = await newItem.save()
        return savedItem    
    }

    public async update(id: string, item: IOrder): Promise<IOrder | undefined> {
        return (await Order.findOneAndUpdate({id}, {$set: item}, {returnDocument: 'after'})) || undefined 
    }

    public async delete(item: { id: string }): Promise<IOrder | undefined> {
        const _id = item.id
        return (await Order.findOneAndDelete({_id})) || undefined    
    }
}

