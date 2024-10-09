import { Material } from "./material.entity.js";
export class MaterialRepository {
    async findAll() {
        const materials = await Material;
        return await materials.find().exec();
    }
    async findOne(item) {
        const materialById = await Material
            .findById(item.id);
        return (materialById || undefined);
    }
    async add(item) {
        const newItem = new Material(item);
        const savedItem = await newItem.save();
        return savedItem;
    }
    async update(id, item) {
        return (await Material.findOneAndUpdate({ _id: id }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async delete(item) {
        const _id = item.id;
        return (await Material.findOneAndDelete({ _id })) || undefined;
    }
}
//# sourceMappingURL=material.repository.js.map