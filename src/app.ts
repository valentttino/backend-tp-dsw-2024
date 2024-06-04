import express from 'express'
import { Customer } from './customer/customer.entity.js'

const app = express()
app.use(express.json())

//Creamos cliente de prueba
let customers = [
    new Customer(
        'c123',
        '38555222',
        'Nicolas Zapata',
        'San Luis 1489',
        'nzapata@gmail.com',
        '3425556666'
    )
]

app.get('/api/customers', (req,res) => {
    res.json(customers)
})

app.get('/api/customers/:id', (req,res) =>{
    const idSearch = req.params.id
    const customer = customers.find(c => c.id === idSearch)
    if (!customer) {
        return res.status(404).send({message:'Customer not found'})
    }
    res.json(customer)
})

app.post('/api/customers',(req,res) => {
    const body = req.body

    const customerNew = new Customer(
        body.id,        //por ahora, la id es ingresada por el usuario
        body.dni,
        body.name,
        body.address,
        body.email,
        body.phone,
    )

    customers.push(customerNew)
    return res.status(201).send(customerNew)
})

app.delete('/api/customers/:id', (req,res) => {
    const idToDelete = req.params.id
    customers = customers.filter(c => c.id !== idToDelete)

    res.status(204).end()
})

app.put('/api/customers/:id',(req,res) => {
    const body = req.body
    const idSearch = req.params.id
    
    const customerIndex = customers.findIndex(c => c.id === idSearch)
    if (customerIndex === -1) {
        return res.status(404).send({message:'Customer not found'})
    }

    const customerExist = customers[customerIndex]
    
    const customerUpdated = new Customer(
        idSearch,
        body.dni !== undefined ? body.dni : customerExist.dni,
        body.name !== undefined ? body.name : customerExist.name,
        body.address !== undefined ? body.address : customerExist.address,
        body.email !== undefined ? body.email : customerExist.email,
        body.phone !== undefined ? body.phone : customerExist.phone,
    )

    customers[customerIndex] = customerUpdated
    res.status(200).send(customerUpdated)
})

app.listen(3006, ()=>{
    console.log('Server running on http://localhost:3006/')
})

