export class Order {
    constructor(
        public orderNumber: string,
        public idEmployee: string,
        public idCustomer: string,
        public idMaterial: string,
        public totalCost: GLfloat,
        public orderDate: Date
    ){}
}