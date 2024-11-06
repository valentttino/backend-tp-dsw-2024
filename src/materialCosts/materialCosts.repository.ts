import { Repository } from "../shared/repository.js"
import { MaterialCosts, IMaterialCosts } from "./materialCosts.entity.js"

export class MaterialCostsRepository implements Repository<IMaterialCosts>{

    public async findAll(): Promise<IMaterialCosts[] | undefined> {
        const materialCost = await MaterialCosts
        return await materialCost.find().exec()    
    }

    public async findOne(item: { id: string }): Promise<IMaterialCosts | undefined> {
        const materialCostById = await MaterialCosts
            .findById(item.id)
        return (materialCostById || undefined)    
    }

    public async add(item: IMaterialCosts): Promise<IMaterialCosts | undefined> {
        const newItem = new MaterialCosts(item)
        const savedItem = await newItem.save()
        return savedItem    
    }

    public async update(id: string, item: IMaterialCosts): Promise<IMaterialCosts | undefined> {
        return (await MaterialCosts.findOneAndUpdate({id}, {$set: item}, {returnDocument: 'after'})) || undefined
    }

    public async delete(item: { id: string }): Promise<IMaterialCosts | undefined> {
        const _id = item.id
        return (await MaterialCosts.findOneAndDelete({_id})) || undefined  
    }
}