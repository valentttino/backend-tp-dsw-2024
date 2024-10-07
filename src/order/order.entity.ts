import mongoose from "mongoose";

export interface IOrderDetail {
    idProduct: string
    quantity: number
    price: number
}

export interface IOrder extends mongoose.Document {
    idEmployee: string
    idCustomer: string
    totalCost: number
    paymentMethod: string
    orderDate: Date
    details: IOrderDetail[]
    id: string
}

const orderDetailSchema = new mongoose.Schema({
    idProduct: {type: String, required: true},
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
})

const orderSchema = new mongoose.Schema({
    idEmployee: { type: String, required: true },
    idCustomer: { type: String, required: true },
    totalCost: { type: Number, required: true },
    paymentMethod: {type: String, required: true}, // C: Cash, I: Instalment
    orderDate: { type: Date, required: true },
    details: [orderDetailSchema]  // Array de subdocumentos para los detalles
})

orderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

export const Order = mongoose.model<IOrder>('Order', orderSchema)