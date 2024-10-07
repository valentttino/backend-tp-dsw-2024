import mongoose from "mongoose"

export interface IInstallmentsDetails {
    installmentN: number, 
    paymentDate: Date,
    amount: number,
    paid: string
}

export interface IPayment extends Document {
    idOrder: string,
    numberOfInstallments: number,
    paid: string,
    installmentsDetails: IInstallmentsDetails[],
    id: string
}

const installmentsDetailsSchema = new mongoose.Schema({
    installmentN: {type: Number, required: true}, 
    paymentDate: {type: Date, required: true},
    amount: {type: Number, required: true},
    paid: {type: String, required: true}, //Y: Yes. N: No.
})

const paymentSchema = new mongoose.Schema({
    idOrder: {type: String, required: true},
    numberOfInstallments: {type: Number, required: true},
    paid: {type: String, required: true}, //Y: Yes, total. N: Not yet.
    installmentsDetails: [installmentsDetailsSchema]
})

paymentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema)
