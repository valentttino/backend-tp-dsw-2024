import { Material } from "./material.entity.js";
let materials = [
    new Material('m285', 'cemento', 'secado rapido', 1500)
];
export class MaterialRepository {
    findAll() {
        return materials;
    }
    findOne(item) {
        return materials.find(o => o.id === item.id);
    }
    add(item) {
        materials.push(item);
        return item;
    }
    update(item) {
        const materialIdx = materials.findIndex((material) => material.id === item.id);
        if (materialIdx !== -1) {
            materials[materialIdx] = { ...materials[materialIdx], ...item };
        }
        return materials[materialIdx];
    }
    delete(item) {
        const deletedMaterial = materials.find(o => o.id === item.id);
        materials = materials.filter(o => o.id !== item.id);
        return deletedMaterial;
    }
}
//# sourceMappingURL=material.repository.js.map