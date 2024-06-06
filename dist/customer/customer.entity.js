export class Customer {
    constructor(id, dni, name, address, email, phone, orders = []) {
        this.id = id;
        this.dni = dni;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.orders = orders;
    }
}
//# sourceMappingURL=customer.entity.js.map