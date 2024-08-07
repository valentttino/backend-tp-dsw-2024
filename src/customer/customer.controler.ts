import { Request, Response } from "express"
import { CustomerRepository } from "./customer.repository.js"
import { ICustomer } from "./customer.entity.js"

const repository = new CustomerRepository()

async function findAll(req: Request, res: Response){
    res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response){
    const idSearch = req.params.id
    const customer = await repository.findOne({id: idSearch})
    if (!customer) {
        return res.status(404).send({message:'Customer not found'})
    }
    res.json(customer)
}

async function add(req: Request, res: Response){
    const body = req.body

    const customerNew: ICustomer = {
        dni: body.dni,
        name: body.name,
        address: body.address,
        email: body.email,
        phone: body.phone
    } as ICustomer

    const customer = await repository.add(customerNew)
    return res.status(201).send(customer)
}

async function update(req: Request, res: Response){
    let body = req.body
    body.id = req.params.id
    
    const customer = await repository.update(body.id, body)

    if (!customer) {
        return res.status(404).send({message:'Customer not found'})
    }

    res.status(200).send(customer)
}

async function remove(req: Request, res: Response){
    const id = req.params.id
    const customer = await repository.delete({id})

    if (!customer){
        res.status(404).send({message: 'Customer not found'})
    } else{
        res.status(200).send({message: 'Customer deleted successfully'})
    }
}

export {findAll, findOne, add, update, remove}