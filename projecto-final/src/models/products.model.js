import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

productsSchema.plugin(mongoosePaginate)

export default model('products', productsSchema)
