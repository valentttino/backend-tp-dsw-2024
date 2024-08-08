import { Request, Response } from "express"
import { OrderRepository } from "./order.repository.js"
import { IOrder } from "./order.entity.js"


const repository = new OrderRepository()

async function findAll(req: Request, res: Response){
    res.json({data: await repository.findAll()})
}

async function findOne(req: Request, res: Response){
    const idSearch = req.params.id
    const order = await repository.findOne({id: idSearch})
    if (!order){
        return res.status(404).send({message:'Order not found'})
    }
    res.json(order)
}

async function add(req: Request, res: Response){
    const body = req.body

    const orderNew: IOrder = {
        idEmployee: body.idEmployee,
        idCustomer: body.idCustomer,
        idMaterial: body.idMaterial,
        totalCost: body.totalCost,
        orderDate: body.orderDate
    } as IOrder

    const order = await repository.add(orderNew)
    return res.status(201).send(order)
}

async function update(req: Request, res: Response){
    let body = req.body
    body.id = req.params.id

    const order = await repository.update(body.id, body)

    if (!order){
        return res.status(404).send({message:'Order not found'})
    }

    res.status(200).send(order)
}

async function remove(req: Request, res: Response){
    const id = req.params.id

    const order = await repository.delete({id})

    if(!order){
        res.status(404).send({message:'Order not found'})
    } else{
        res.status(200).send({message:'Order deleted successfully'})
    }
}

export {findAll, findOne, add, update, remove}