import { Request, Response, NextFunction } from "express"
import { CustomerRepository } from "./customer.repository.js"
import { ICustomer } from "./customer.entity.js"

const repository = new CustomerRepository()

function sanitizeCustomerInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
      name: req.body.name,
      dni: req.body.dni,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
    }
  
    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined || req.body.sanitizedInput[key] === null || req.body.sanitizedInput[key] === '') {
        delete req.body.sanitizedInput[key]
      }
    })
    next()
}

async function findAll(req: Request, res: Response) {
    try {
        const customers = await repository.findAll()
        res.json({ data: customers })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching customers.' })
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const idSearch = req.params.id;
        const customer = await repository.findOne({ id: idSearch })
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' })
        }
        res.json(customer)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the customer.' })
    }
}

async function add(req: Request, res: Response) {
    try {
        const input = req.body.sanitizedInput

        const customerNew: ICustomer = {
            dni: input.dni,
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone,
        } as ICustomer

        const customer = await repository.add(customerNew)
        res.status(201).send(customer)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the customer.' })
    }
}

async function update(req: Request, res: Response) {
    try {
        const input = req.body.sanitizedInput
        input.id = req.params.id

        const customer = await repository.update(input.id, input)

        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' })
        }

        res.status(200).send(customer)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the customer.' })
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id
        const customer = await repository.delete({ id })

        if (!customer) {
            res.status(404).send({ message: 'Customer not found' })
        } else {
            res.status(200).send({ message: 'Customer deleted successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the customer.' })
    }
}

export {sanitizeCustomerInput, findAll, findOne, add, update, remove}