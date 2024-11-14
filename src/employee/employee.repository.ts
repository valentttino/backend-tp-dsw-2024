import { Repository } from "../shared/repository.js"
import { Employee , IEmployee} from "./employee.entity.js"

export class EmployeeRepository implements Repository<IEmployee>{

    public async findAll(): Promise<IEmployee[] | undefined> {
        const employees = await Employee
        return await employees.find().exec()    
    }

    public async findOne(item: { id?: string, cuil?: string }): Promise<IEmployee | undefined> {
        let employee: IEmployee | null = null
        if(item.id){
            employee = await Employee
                .findById(item.id)
        }else if (item.cuil){
            employee = await Employee
                .findOne({cuil: item.cuil})
        }
        return (employee || undefined)    
    }

    public async add(item: IEmployee): Promise<IEmployee | undefined> {
        const newItem = new Employee(item)
        const savedItem = await newItem.save()
        return savedItem    
    }

    public async update(id: string, item: IEmployee): Promise< IEmployee | undefined> {
        return (await Employee.findOneAndUpdate({_id: id}, {$set: item}, {returnDocument: 'after'})) || undefined
    }

    public async delete(item: { id: string }): Promise< IEmployee | undefined> {
        const _id = item.id
        return (await Employee.findOneAndDelete({_id})) || undefined  
    }
}
