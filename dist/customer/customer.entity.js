import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
    dni: String,
    name: String,
    address: String,
    email: String,
    phone: String,
});
customerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
export const Customer = mongoose.model('Customer', customerSchema);
//# sourceMappingURL=customer.entity.js.map