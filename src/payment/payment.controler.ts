import { Request, Response } from "express"
import { PaymentRepository } from "./payment.repository.js"
import { Payment } from "./payment.entity.js"
import { Repository } from "../shared/repository.js"

const repository = new PaymentRepository()

function findAll(req: Request, res: Response){
    res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response){
    const idSearch = req.params.id
    const payment = repository.findOne({id: idSearch})
    if (!payment) {
        return res.status(404).send({message:'Payment not found'})
    }
    res.json(payment)
}

function add(req: Request, res: Response){
    const body = req.body

    const paymentNew = new Payment(
        body.paymentNumber,        
        body.orderNumber,
        body.amount,
        body.orderDate
    )

    const payment = repository.add(paymentNew)
    return res.status(201).send(payment)
}

function update(req: Request, res: Response){
    let body = req.body
    body.id = req.params.id
    
    const payment = repository.update(body)

    if (!payment) {
        return res.status(404).send({message:'Payment not found'})
    }

    res.status(200).send(payment)
}

function remove(req: Request, res: Response){
    const id = req.params.id
    const payment = repository.delete({id})

    if (!payment){
        res.status(404).send({message: 'Payment not found'})
    } else{
        res.status(200).send({message: 'Payment deleted successfully'})
    }
}

export {findAll, findOne, add, update, remove}