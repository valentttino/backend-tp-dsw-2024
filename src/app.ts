import express from 'express'
import { Cliente } from './cliente.js'

const app = express()
app.use(express.json())

//Creamos cliente de prueba
let clientes = [
    new Cliente(
        'c123',
        '38555222',
        'Nicolas Zapata',
        'San Luis 1489',
        'nzapata@gmail.com',
        '3425556666'
    )
]

app.get('/api/clientes', (req,res) => {
    res.json(clientes)
})

app.get('/api/clientes/:id', (req,res) =>{
    const idSearch = req.params.id
    const cliente = clientes.find(c => c.id === idSearch)
    if (!cliente) {
        return res.status(404).send({message:'Cliente not found'})
    }
    res.json(cliente)
})

app.post('/api/clientes',(req,res) => {
    const body = req.body

    const clienteNuevo = new Cliente(
        body.id,        //por ahora, la id es ingresada por el usuario
        body.dni,
        body.nomApe,
        body.direccion,
        body.email,
        body.telefono,
    )

    clientes.push(clienteNuevo)
    return res.status(201).send(clienteNuevo)
})

app.delete('/api/clientes/:id', (req,res) => {
    const idToDelete = req.params.id
    clientes = clientes.filter(c => c.id !== idToDelete)

    res.status(204).end()
})

app.put('/api/clientes/:id',(req,res) => {
    const body = req.body
    const idSearch = req.params.id
    
    const clienteIndice = clientes.findIndex(c => c.id === idSearch)
    if (clienteIndice === -1) {
        return res.status(404).send({message:'Cliente not found'})
    }

    const clienteExistente = clientes[clienteIndice]
    
    const clienteActualizado = new Cliente(
        idSearch,
        body.dni !== undefined ? body.dni : clienteExistente.dni,
        body.nomApe !== undefined ? body.nomApe : clienteExistente.nomApe,
        body.direccion !== undefined ? body.direccion : clienteExistente.direccion,
        body.email !== undefined ? body.email : clienteExistente.email,
        body.telefono !== undefined ? body.telefono : clienteExistente.telefono,
    )

    clientes[clienteIndice] = clienteActualizado
    res.status(200).send(clienteActualizado)
})

app.listen(3006, ()=>{
    console.log('Server running on http://localhost:3006/')
})

