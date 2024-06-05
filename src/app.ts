import express from 'express'
import { customerRouter } from './customer/customer.routes.js'

const app = express()
app.use(express.json())

app.use(express.json())

app.use('/api/customers' , customerRouter)

app.use((_,res) => {
    return res.status(404).send({message: 'Resource not found'})
})

app.listen(3006, ()=>{
    console.log('Server running on http://localhost:3006/')
})

