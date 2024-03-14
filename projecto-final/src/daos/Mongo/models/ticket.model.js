import { Schema, model } from 'mongoose'

const ticketSchema = new Schema({
  code: {
    type: String
  },
  purchase_datetime: {
    type: Date
  },
  amount: {
    type: Number
  },
  purchaser: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

export default model('tickets', ticketSchema)
