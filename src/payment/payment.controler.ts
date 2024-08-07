import { Request, Response } from "express"
import { PaymentRepository } from "./payment.repository.js"
import { IPayment } from "./payment.entity.js"

const repository = new PaymentRepository()

async function findAll(req: Request, res: Response){
    res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response){
    const idSearch = req.params.id
    const payment = await repository.findOne({id: idSearch})
    if (!payment) {
        return res.status(404).send({message:'Payment not found'})
    }
    res.json(payment)
}

async function add(req: Request, res: Response){
    const body = req.body

    const paymentNew: IPayment = {
        paymentNumber: body.paymentNumber,
        orderNumber: body.orderNumber,
        amount: body.amount,
        orderDate: body.orderDate
    } as IPayment

    const payment = await repository.add(paymentNew)
    return res.status(201).send(payment)
}

async function update(req: Request, res: Response){
    let body = req.body
    body.id = req.params.id
    
    const payment = await repository.update(body.id, body)

    if (!payment) {
        return res.status(404).send({message:'Payment not found'})
    }

    res.status(200).send(payment)
}

async function remove(req: Request, res: Response){
    const id = req.params.id
    const payment = await repository.delete({id})

    if (!payment){
        res.status(404).send({message: 'Payment not found'})
    } else{
        res.status(200).send({message: 'Payment deleted successfully'})
    }
}

export {findAll, findOne, add, update, remove}