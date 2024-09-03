import mongoose from "mongoose"

export interface IMaterial extends Document {
    name: string,
    description: string,
    brand: string,
    category: string,
    stock: number,
    cost: number
}

const materialSchema = new mongoose.Schema({
    name: String,
    description: String,
    brand: String,
    category: String,
    stock: Number,
    cost: Number
})

materialSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Material = mongoose.model<IMaterial>('Material', materialSchema)
