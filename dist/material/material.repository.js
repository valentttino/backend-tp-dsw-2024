import { Material } from "./material.entity.js";
import { Order } from "../order/order.entity.js";
let materials = [
    new Material('285', 'cemento', 'secado rapido', '150 bolsas', '12000' [
        new Order('1974', 'e285', 'c123', '74', 1800.0, new Date('2024-06-02')),
        new Order('1988', 'e285', 'c123', '22', 1200.0, new Date('2024-06-11'))
    ])
];
export class MaterialRepository {
    findAll() {
        return materials;
    }
    findOne(item) {
        return materials.find(c => c.id === item.id);
    }
    add(item) {
        materials.push(item);
        return item;
    }
    update(item) {
        const employeeIdx = materials.findIndex((material) => material.id === item.id);
        if (materialIdx !== -1) {
            materials[employeeIdx] = { ...materials[materialIdx], ...item };
        }
        return materials[materialIdx];
    }
    delete(item) {
        const deletedMaterial = materials.find(c => c.id === item.id);
        materials = materials.filter(c => c.id !== item.id);
        return deletedMaterial;
    }
}
