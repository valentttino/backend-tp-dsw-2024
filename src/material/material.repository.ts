import { Repository } from "../shared/repository.js"
import { Material, IMaterial } from "./material.entity.js"

export class MaterialRepository implements Repository<IMaterial>{

    public async findAll(): Promise<IMaterial[] | undefined> {
        const materials = await Material
        return await materials.find().exec()    
    }

    public async findOne(item: { id: string }): Promise<IMaterial | undefined> {
        const materialById = await Material
            .findById(item.id)
        return (materialById || undefined)    
    }

    public async add(item: IMaterial): Promise<IMaterial | undefined> {
        const newItem = new Material(item)
        const savedItem = await newItem.save()
        return savedItem    
    }

    public async update(id: string, item: IMaterial): Promise<IMaterial | undefined> {
        return (await Material.findOneAndUpdate({_id: id}, {$set: item}, {returnDocument: 'after'})) || undefined
    }

    public async delete(item: { id: string }): Promise<IMaterial | undefined> {
        const _id = item.id
        return (await Material.findOneAndDelete({_id})) || undefined  
    }
}


