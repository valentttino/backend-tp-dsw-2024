import { Request, Response, NextFunction } from "express"
import { PaymentRepository } from "./payment.repository.js"
import { IPayment, IInstallmentsDetails } from "./payment.entity.js"

const repository = new PaymentRepository()

function sanitizePaymentInput(req: Request, res: Response, next: NextFunction) {
        req.body.sanitizedInput = {
            idOrder: req.body.idOrder,
            numberOfInstallments: req.body.numberOfInstallments,
            paid: req.body.paid,
            installmentsDetails: req.body.installmentsDetails,
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined || req.body.sanitizedInput[key] === null || req.body.sanitizedInput[key] === '') {
        delete req.body.sanitizedInput[key]
        }
    })
    next()
}

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
    const input = req.body.sanitizedInput

    const paymentNew: IPayment = {
        idOrder: input.idOrder,
        numberOfInstallments: input.numberOfInstallments,
        paid: input.paid,
        installmentsDetails: input.installmentsDetails
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

export {findAll, findOne, add, update, remove, sanitizePaymentInput}