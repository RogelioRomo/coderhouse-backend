import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
  user: {
    type: String
  },
  message: {
    type: String
  }
})

export default model('messages', messageSchema)
