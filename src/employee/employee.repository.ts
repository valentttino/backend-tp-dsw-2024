import { Repository } from "../shared/repository.js"
import { Employee , IEmployee} from "./employee.entity.js"

export class EmployeeRepository implements Repository<IEmployee>{

    public async findAll(): Promise<IEmployee[] | undefined> {
        const employees = await Employee
        return await employees.find().exec()    
    }

    public async findOne(item: { id: string }): Promise<IEmployee | undefined> {
        const employeeById = await Employee
            .findById(item.id)
        return (employeeById || undefined)    
    }

    public async add(item: IEmployee): Promise<IEmployee | undefined> {
        const newItem = new Employee(item)
        const savedItem = await newItem.save()
        return savedItem    
    }

    public async update(id: string, item: IEmployee): Promise< IEmployee | undefined> {
        return (await Employee.findOneAndUpdate({id}, {$set: item}, {returnDocument: 'after'})) || undefined
    }

    public async delete(item: { id: string }): Promise< IEmployee | undefined> {
        const _id = item.id
        return (await Employee.findOneAndDelete({_id})) || undefined  
    }
}
