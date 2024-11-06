import { Request, Response, NextFunction } from "express"
import { MaterialCostsRepository } from "./materialCosts.repository.js"
import { IMaterialCosts, ICostHistory } from "./materialCosts.entity.js"

const repository = new MaterialCostsRepository()

function sanitizeMaterialCostsInput(req: Request, res: Response, next: NextFunction) {
        req.body.sanitizedInput = {
            idMaterial: req.body.idMaterial,
            costHistory: req.body.costHistory,
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined || req.body.sanitizedInput[key] === null || req.body.sanitizedInput[key] === '') {
        delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function findAll(req: Request, res: Response){
    try{
        res.json({ data: await repository.findAll() })
    }
    catch (error){
        res.status(500).json({ message: 'An error occurred while fetching materialCosts.' })
    }
}

async function findOne(req: Request, res: Response){
    try{
        const idSearch = req.params.id
        const materialCosts = await repository.findOne({id: idSearch})
        if (!materialCosts) {
            return res.status(404).send({message:'MaterialCosts not found'})
        }
        res.json(materialCosts)
    }
    catch (error){
        res.status(500).json({ message: 'An error occurred while fetching the materialCosts.'})
    }
}

async function add(req: Request, res: Response){
    try{
        const input = req.body.sanitizedInput

        const materialCostsNew: IMaterialCosts = {
            idMaterial: input.idMaterial,
            costHistory: input.costHistory
        } as IMaterialCosts

        const materialCosts = await repository.add(materialCostsNew)
        return res.status(201).send(materialCosts)
    }
    catch (error){
        res.status(500).json({ message: 'An error occurred while adding the materialCosts.' })
    }
}

async function update(req: Request, res: Response){
    try{
        let body = req.body
        body.id = req.params.id
        
        const materialCosts = await repository.update(body.id, body)

        if (!materialCosts) {
            return res.status(404).send({message:'MaterialCosts not found'})
        }

        res.status(200).send(materialCosts)
    }
    catch (error){
        res.status(500).json({ message: 'An error occurred while updating the materialCosts.' })
    }
}

async function remove(req: Request, res: Response){
    try{
        const id = req.params.id
        const materialCosts = await repository.delete({id})

        if (!materialCosts){
            res.status(404).send({message: 'MaterialCosts not found'})
        } else{
            res.status(200).send({message: 'MaterialCosts deleted successfully'})
        }
    }
    catch (error){
        res.status(500).json({ message: 'An error occurred while deleting the MaterialCosts.' })
    }
}

export {findAll, findOne, add, update, remove, sanitizeMaterialCostsInput}