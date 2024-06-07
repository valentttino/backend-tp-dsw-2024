export class Payment {
    constructor(
        public paymentNumber: string,
        public orderNumber: string,
        public amount: GLfloat,
        public orderDate: Date
    ){}
}