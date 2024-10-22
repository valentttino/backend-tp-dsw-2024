import { Request, Response, NextFunction } from "express"
import { OrderRepository } from "./order.repository.js"
import { IOrder } from "./order.entity.js"
import { IOrderDetail } from './order.entity.js'

const repository = new OrderRepository()

function sanitizeOrderInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        idEmployee: req.body.idEmployee,
        idCustomer: req.body.idCustomer,
        totalCost: req.body.totalCost,
        paymentMethod: req.body.paymentMethod,
        orderDate: req.body.orderDate,
        details: req.body.details?.map((detail: IOrderDetail) => ({
            idProduct: detail.idProduct,
            quantity: detail.quantity,
            price: detail.price
        })) || []
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (
            req.body.sanitizedInput[key] === undefined || 
            req.body.sanitizedInput[key] === null || 
            req.body.sanitizedInput[key] === ''
        ) {
            delete req.body.sanitizedInput[key]
        }
    })

    if (req.body.sanitizedInput.details.length > 0) {
        req.body.sanitizedInput.details = req.body.sanitizedInput.details.filter((detail: IOrderDetail) => {
            return (
                detail.idProduct &&
                detail.quantity !== undefined &&
                detail.price !== undefined
            )
        })
    }

    next()
}

async function findAll(req: Request, res: Response){
    try{
        res.json({data: await repository.findAll()})
    }catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching orders.' })
    }    
}

async function findOne(req: Request, res: Response){
    try{
        const idSearch = req.params.id
        const order = await repository.findOne({id: idSearch})
        if (!order){
        return res.status(404).send({message:'Order not found'})
        }
        res.json(order)
    }catch (error){
        res.status(500).json({ message: 'An error occurred while fetching the order.' })
    }
}

async function add(req: Request, res: Response){
    try{
        const input = req.body.sanitizedInput

        const orderNew: IOrder = {
            idEmployee: input.idEmployee,
            idCustomer: input.idCustomer,
            totalCost: input.totalCost,
            paymentMethod: input.paymentMethod,
            orderDate: input.orderDate,
            details: input.details
        } as IOrder

        const order = await repository.add(orderNew)
        return res.status(201).send(order)
    }catch (error){
        res.status(500).json({ message: 'An error occurred while adding the order.' })
    }
}    

async function update(req: Request, res: Response){
    try{
        let input = req.body.sanitizedInput
        input.id = req.params.id

        const order = await repository.update(input.id, input)

        if (!order){
            return res.status(404).send({message:'Order not found'})
        }

        res.status(200).send(order)
    }catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the order.' })
    }
}    

async function remove(req: Request, res: Response){
    try{
        const id = req.params.id

        const order = await repository.delete({id})

        if(!order){
            res.status(404).send({message:'Order not found'})
        } else{
            res.status(200).send({message:'Order deleted successfully'})
        }
    }catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the order.' })
    }
}

export {sanitizeOrderInput, findAll, findOne, add, update, remove}