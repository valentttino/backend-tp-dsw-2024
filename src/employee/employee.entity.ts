import mongoose from "mongoose"

export interface IEmployee extends Document {
    cuil: string,
    dni: string,
    name: string,
    address: string,
    email: string, 
    phone: string, 

}

const employeeSchema = new mongoose.Schema({
    cuil: String,
    dni: String,
    name: String,
    address: String,
    email: String, 
    phone: String, 
})

employeeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Employee = mongoose.model<IEmployee>('Employee', employeeSchema)
