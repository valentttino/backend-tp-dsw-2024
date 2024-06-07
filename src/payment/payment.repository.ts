import { Repository } from "../shared/repository.js"
import { Payment} from "./payment.entity.js"

let payments = [
    new Payment(
        'p2805',
        'o100',
        1500,
        new Date('2024-06-02') 
    )
]

export class PaymentRepository implements Repository<Payment>{

    public findAll(): Payment[] | undefined {
        return payments    
    }

    public findOne(item: { id: string }): Payment | undefined {
        return payments.find(o => o.paymentNumber === item.id)    
    }

    public add(item: Payment): Payment | undefined {
        payments.push(item)
        return item    
    }

    public update(item: Payment): Payment | undefined {
        const paymentIdx = payments.findIndex((payment) => payment.paymentNumber === item.paymentNumber)

        if (paymentIdx !== -1){
            payments[paymentIdx] = {...payments[paymentIdx], ...item}
        }
        return payments[paymentIdx]
    }

    public delete(item: { id: string }): Payment | undefined {
        const deletedPayment = payments.find(o => o.paymentNumber === item.id)
        payments = payments.filter(o => o.paymentNumber !== item.id)
        return deletedPayment  
    }
}


