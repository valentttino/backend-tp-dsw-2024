import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { EmployeeRepository } from '../employee/employee.repository.js'
import { IEmployee } from '../employee/employee.entity.js'

const repository = new EmployeeRepository()

export const loginUser = async(req: Request, res: Response) =>{
  const {cuil, password} = req.body

  const employee: IEmployee | undefined = await repository.findOne({cuil})

  if(!employee){
    return res.status(401).json({error: 'Invalid CUIL or password'})
  }

  const passwordCorrect = await bcrypt.compare(password, employee.password)

  if(!passwordCorrect){
    return res.status(401).json({error: 'Invalid CUIL or password'})
  }

  const employeeForToken = {
    cuil: employee.cuil,
    id: employee.id
  }

  const token = jwt.sign(employeeForToken, process.env.SECRET as string, {
    expiresIn: '1h'
  })

  res.status(200).json({
    token,
    cuil: employee.cuil,
    name: employee.name
  })
}