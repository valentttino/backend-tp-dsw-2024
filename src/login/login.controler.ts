import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { EmployeeRepository } from '../employee/employee.repository.js'

const repository = new EmployeeRepository()

export const loginUser = async(req: Request, res: Response) =>{
  const {cuil, password} = req.body

  const employee = await repository.findOne({cuil})
}