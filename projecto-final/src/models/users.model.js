import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

userSchema.plugin(mongoosePaginate)

export default model('users', userSchema)
