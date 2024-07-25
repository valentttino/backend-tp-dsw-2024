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

const testSchema = new mongoose.Schema({
  content: String,
  ok: Boolean,
})

const Test = mongoose.model('Test', testSchema)

const test = new Test({
  content: 'DB TEST',
  important: true,
})

test.save().then((result) => {
  console.log('test saved!')
  mongoose.connection.close()
})