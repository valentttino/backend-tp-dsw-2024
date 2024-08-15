import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    idEmployee: String,
    idCustomer: String,
    idMaterial: String,
    totalCost: Number,
    orderDate: Date
});
orderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
export const Order = mongoose.model('Order', orderSchema);
//# sourceMappingURL=order.entity.js.map