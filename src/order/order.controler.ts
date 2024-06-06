import { Request, Response } from "express"
import { OrderRepository } from "./order.repository.js"
import { Order } from "./order.entity.js"
import { Repository } from "../shared/repository.js"

const repository = new OrderRepository()

function findAll(req: Request, res: Response){
    res.json({data: repository.findAll()})
}

function findOne(req: Request, res: Response){
    const orderNumberSearch = req.params.orderNumber
    const order = repository.findOne({id: orderNumberSearch})
    if (!order){
        return res.status(404).send({message:'Order not found'})
    }
    res.json(order)
}

function add(req: Request, res: Response){
    const body = req.body

    const orderNew = new Order(
        body.orderNumber,
        body.idEmployee,
        body.idCustomer,
        body.idMaterial,
        body.totalCost,
        body.orderDate
    )

    const order = repository.add(orderNew)
    return res.status(201).send(order)
}

function update(req: Request, res: Response){
    let body = req.body
    body.orderNumber = req.params.orderNumber

    const order = repository.update(body)

    if (!order){
        return res.status(404).send({message:'Order not found'})
    }

    res.status(200).send(order)
}

function remove(req: Request, res: Response){
    const id = req.params.orderNumber

    const order = repository.delete({id})

    if(!order){
        res.status(404).send({message:'Order not found'})
    } else{
        res.status(200).send({message:'Order deleted successfully'})
    }
}

export {findAll, findOne, add, update, remove}