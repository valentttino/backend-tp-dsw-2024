import { Repository } from "../shared/repository.js"
import { Customer, ICustomer } from "./customer.entity.js"

export class CustomerRepository implements Repository<ICustomer>{

    public async findAll(): Promise<ICustomer[] | undefined> {
        const customers = await Customer
        return await customers.find().exec()    
    }

    public async findOne(item: { id: string }): Promise<ICustomer | undefined> {
        const customerById = await Customer
            .findById(item.id)
        return (customerById || undefined)    
    }
    
    public async add(item: ICustomer): Promise<ICustomer | undefined> {
        const newItem = new Customer(item)
        const savedItem = await newItem.save()
        return savedItem    
    }

    public async update(id: string, item: ICustomer): Promise<ICustomer | undefined> {
        return (await Customer.findOneAndUpdate({_id: id}, {$set: item}, {returnDocument: 'after'})) || undefined
    }

    public async delete(item: { id: string }): Promise<ICustomer | undefined> {
        const _id = item.id
        return (await Customer.findOneAndDelete({_id})) || undefined  
    }
}