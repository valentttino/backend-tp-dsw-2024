import { Request, Response } from "express"
import { MaterialRepository } from "./material.repository.js"
import { Material } from "./material.entity.js"
import { Repository } from "../shared/repository.js"

const repository = new MaterialRepository()

function findAll(req: Request, res: Response){
    res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response){
    const idSearch = req.params.id
    const material = repository.findOne({id: idSearch})
    if (!material) {
        return res.status(404).send({message:'Material not found'})
    }
    res.json(material)
}

function add(req: Request, res: Response){
    const body = req.body

    const materialNew = new Material(
        body.id,        //por ahora, la id es ingresada por el empleado
        body.name,
        body.description,
        body.stock
    )

    const material = repository.add(materialNew)
    return res.status(201).send(material)
}

function update(req: Request, res: Response){
    let body = req.body
    body.id = req.params.id
    
    const material = repository.update(body)

    if (!material) {
        return res.status(404).send({message:'Material not found'})
    }

    res.status(200).send(material)
}

function remove(req: Request, res: Response){
    const id = req.params.id
    const material = repository.delete({id})

    if (!material){
        res.status(404).send({message: 'Material not found'})
    } else{
        res.status(200).send({message: 'Material deleted successfully'})
    }
}

export {findAll, findOne, add, update, remove}