import { Request, Response } from "express"
import { MaterialRepository } from "./material.repository.js"
import { IMaterial } from "./material.entity.js"
import { upload } from "../config/multer.js"
import { uploadFile } from "../utils/uploadFile.js"

const repository = new MaterialRepository()

async function findAll(req: Request, res: Response){
    try{
        res.json({ data: await repository.findAll() })
    }catch (error){
        res.status(500).json({ message: 'An error occurred while fetching materials.' })
    }
}

async function findOne(req: Request, res: Response){
    try{
        const idSearch = req.params.id
        const material = await repository.findOne({id: idSearch})
        if (!material) {
            return res.status(404).send({message:'Material not found'})
        }
        res.json(material)
    }catch (error){
        res.status(500).json({ message: 'An error occurred while fetching the material.' })
    }
}

async function add(req: Request, res: Response){
    try{
        upload.single('image')(req, res, async (err: any) => {
            if(err){
                res.status(500).json({message: err.message})
                return
            }

            try{
                const body = req.body
                const image = req.file
                let imageUrl: string | null = null

                if(image){
                    const {downloadURL} = await uploadFile(image)
                    imageUrl = downloadURL
                }

                const materialNew: IMaterial = {
                    image: imageUrl,
                    name: body.name,
                    description: body.description,
                    brand: body.brand,
                    category: body.category,
                    stock: body.stock,
                    cost: body.cost
                } as IMaterial

                const material = await repository.add(materialNew)
                res.status(201).send(material)
            } catch(err: any){
                res.status(500).json({message: err.message})
            }
        })
    }catch (error){
        res.status(500).json({ message: 'An error occurred while adding the material.' })
    }
}

async function update(req: Request, res: Response){
    try{
        let body = req.body
        body.id = req.params.id
    
        const material = await repository.update(body.id, body)

        if (!material) {
            return res.status(404).send({message:'Material not found'})
        }

        res.status(200).send(material)
    }catch (error){
        res.status(500).json({ message: 'An error occurred while updating the material.' })
    }
}

async function remove(req: Request, res: Response){
    try{
        const id = req.params.id
        const material = await repository.delete({id})

        if (!material){
            res.status(404).send({message: 'Material not found'})
        } else{
            res.status(200).send({message: 'Material deleted successfully'})
        }
    }catch (error){
        res.status(500).json({ message: 'An error occurred while deleting the material.' })
    }
}

export {findAll, findOne, add, update, remove}