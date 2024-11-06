import mongoose from "mongoose"

export interface ICostHistory {
  updateDate: Date,
  cost: number,
  _id: string
}

export interface IMaterialCosts extends Document {
  idMaterial: string,
  costHistory: ICostHistory[],
  id: string
}

const costHistorySchema = new mongoose.Schema({
  updateDate: { type: Date, required: true},
  cost: { type: Number, required: true}
})

const materialCostsSchema = new mongoose.Schema({
  idMaterial: { type: String, required: true},
  costHistory: [costHistorySchema]
})

materialCostsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const MaterialCosts = mongoose.model<IMaterialCosts>('MaterialCosts', materialCostsSchema)