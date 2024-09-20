import mongoose from "mongoose"

export interface IEmployee extends Document {
    id: string,
    cuil: string,
    dni: string,
    name: string,
    password: string,
    address: string,
    email: string, 
    phone: string,
    role: string
}

const employeeSchema = new mongoose.Schema({
    cuil: String,
    dni: String,
    name: String,
    password: String,
    address: String,
    email: String, 
    phone: String,
    role: String 
})

employeeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Employee = mongoose.model<IEmployee>('Employee', employeeSchema)
