import mongoose from "mongoose"

export interface IPayment extends Document {
    paymentNumber: string,
    orderNumber: string,
    amount: number,
    orderDate: Date
}

const paymentSchema = new mongoose.Schema({
    paymentNumber: String,
    orderNumber: String,
    amount: Number,
    orderDate: Date
})

paymentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema)
