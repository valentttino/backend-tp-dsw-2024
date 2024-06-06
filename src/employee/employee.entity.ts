import { Order } from "../order/order.entity.js"

export class Employee {
    constructor(
        public id: string,
        public cuil: string,
        public dni: string,
        public name: string,
        public address: string,
        public email: string,
        public phone: string,
        public orders: Order[] = []
    ){}
}