import { Order } from "../order/order.entity.js"

export class Customer {
    constructor(
        public id: string,
        public dni: string,
        public name: string,
        public address: string,
        public email: string,
        public phone: string,
        public orders: Order[] = []
    ){}
}