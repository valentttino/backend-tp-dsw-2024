import { Repository } from "../shared/repository.js"
import { Material } from "./material.entity.js"

let materials = [
    new Material(
        'm285',
        'cemento',
        'secado rapido',
        1500,
    )
]

export class MaterialRepository implements Repository<Material>{

    public findAll(): Material[] | undefined {
        return materials    
    }

    public findOne(item: { id: string }): Material | undefined {
        return materials.find(o => o.id === item.id)    
    }

    public add(item: Material): Material | undefined {
        materials.push(item)
        return item    
    }

    public update(item: Material): Material | undefined {
        const materialIdx = materials.findIndex((material) => material.id === item.id)

        if (materialIdx !== -1){
            materials[materialIdx] = {...materials[materialIdx], ...item}
        }
        return materials[materialIdx]
    }

    public delete(item: { id: string }): Material | undefined {
        const deletedMaterial = materials.find(o => o.id === item.id)
        materials = materials.filter(o => o.id !== item.id)
        return deletedMaterial  
    }
}


