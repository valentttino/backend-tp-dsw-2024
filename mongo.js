import mongoose from 'mongoose'

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://dsw2024:${password}@cluster0.6rfhfc8.mongodb.net/dsw-utn-2024?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(() =>{
    console.log('connected to MongoDB')
  })
  .catch((error) =>{
    console.log('error connecting to MongoDB: ',error.message)
  })
