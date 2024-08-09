import { Repository } from "../shared/repository.js"
import { Payment, IPayment } from "./payment.entity.js"

export class PaymentRepository implements Repository<IPayment>{

    public async findAll(): Promise<IPayment[] | undefined> {
        const payment = await Payment
        return await payment.find().exec()    
    }

    public async findOne(item: { id: string }): Promise<IPayment | undefined> {
        const paymentById = await Payment
            .findById(item.id)
        return (paymentById || undefined)    
    }

    public async add(item: IPayment): Promise<IPayment | undefined> {
        const newItem = new Payment(item)
        const savedItem = await newItem.save()
        return savedItem    
    }

    public async update(id: string, item: IPayment): Promise<IPayment | undefined> {
        return (await Payment.findOneAndUpdate({id}, {$set: item}, {returnDocument: 'after'})) || undefined
    }

    public async delete(item: { id: string }): Promise<IPayment | undefined> {
        const _id = item.id
        return (await Payment.findOneAndDelete({_id})) || undefined  
    }
}



