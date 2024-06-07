export class Material {
    constructor(id, name, description, stock, costDate = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stock = stock;
        this.costDate = costDate;
    }
}
