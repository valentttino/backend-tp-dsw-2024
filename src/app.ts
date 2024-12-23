import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { customerRouter } from './customer/customer.routes.js'
import { employeeRouter } from './employee/employee.routes.js'
import { orderRouter } from './order/order.routes.js'
import { materialRouter } from './material/material.routes.js'
import { materialCostsRouter } from './materialCosts/materialCosts.routes.js'
import { paymentRouter } from './payment/payment.routes.js'
import { loginRouter } from './login/login.routes.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use(express.json())

app.use(cors())

mongoose.set('strictQuery',false)

if(!process.env.MONGODB_URI){
    throw new Error ('MONGODB_URI is not defined')
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() =>{
    console.log('connected to MongoDB')
  })
  .catch((error) =>{
    console.log('error connecting to MongoDB: ',error.message)
  })

app.use('/api/customers' , customerRouter)

app.use('/api/employees', employeeRouter)

app.use('/api/orders', orderRouter)

app.use('/api/materials', materialRouter)

app.use('/api/materialcosts', materialCostsRouter)

app.use('/api/payments', paymentRouter)

app.use('/api/login', loginRouter)

app.use((_,res) => {
    return res.status(404).send({message: 'Resource not found'})
})

app.listen(3006, ()=>{
    console.log('Server running on http://localhost:3006/')
})

