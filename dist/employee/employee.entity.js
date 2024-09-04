import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
    cuil: String,
    dni: String,
    name: String,
    password: String,
    address: String,
    email: String,
    phone: String,
    role: String
});
employeeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
export const Employee = mongoose.model('Employee', employeeSchema);
//# sourceMappingURL=employee.entity.js.map