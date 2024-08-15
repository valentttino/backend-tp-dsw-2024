import mongoose from "mongoose";
const materialSchema = new mongoose.Schema({
    name: String,
    description: String,
    stock: Number,
    cost: Number
});
materialSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
export const Material = mongoose.model('Material', materialSchema);
//# sourceMappingURL=material.entity.js.map