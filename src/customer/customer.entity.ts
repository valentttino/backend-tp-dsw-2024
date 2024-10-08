import mongoose from "mongoose"

export interface ICustomer extends Document {
    dni: string,
    name: string,
    address: string,
    email: string,
    phone: string
}

const customerSchema = new mongoose.Schema({
    dni: String,
    name: String,
    address: String,
    email: String,
    phone: String,
})

customerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Customer = mongoose.model<ICustomer>('Customer', customerSchema)
