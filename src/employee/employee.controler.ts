import { Request, Response, NextFunction } from "express"
import { EmployeeRepository } from "./employee.repository.js"
import { IEmployee } from "./employee.entity.js"
import bcrypt from 'bcrypt'

const repository = new EmployeeRepository()

function sanitizeEmployeeInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
      id: req.body.id,
      cuil: req.body.cuil,
      address: req.body.address,
      name: req.body.name,
      password: req.body.password,
      dni: req.body.dni,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
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
    const employee = await repository.findOne({id: idSearch})
    if (!employee) {
        return res.status(404).send({message:'Employee not found'})
    }
    res.json(employee)
}

async function hashPassword(password: string): Promise<String>{
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

async function add(req: Request, res: Response){
    const body = req.body
    const hashedPassword = await hashPassword(body.password)
    const input = req.body.sanitizedInput


    const employeeNew: IEmployee  = {
        cuil: input.cuil,
        dni: input.dni,
        name: input.name,
        password: hashedPassword,
        address: input.address,
        email: input.email, 
        phone: input.phone,
        role: input.role 
    } as IEmployee

    const employee = await repository.add(employeeNew)
    return res.status(201).send(employee)
}

async function update(req: Request, res: Response){
    const Employee = await repository.update(req.params.id, req.body.sanitizedInput)
    let body = req.body
    body.id = req.params.id
    
    const employee = await repository.update(body.id, body)

    if (!employee) {
        return res.status(404).send({message:'Employee not found'})
    }

    res.status(200).send(employee)
}

async function remove(req: Request, res: Response){
    const id = req.params.id
    const employee = await repository.delete({id})

    if (!employee){
        res.status(404).send({message: 'Employee not found'})
    } else{
        res.status(200).send({message: 'Employee deleted successfully'})
    }
}

export {sanitizeEmployeeInput, findAll, findOne, add, update, remove}
