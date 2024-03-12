import { Schema, model } from 'mongoose'

const cartsSchema = new Schema({
  products: {
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
      },
      quantity: Number,
      isActive: {
        type: Boolean,
        default: true
      }
    }]
  }
})

cartsSchema.pre('findOne', function (next) {
  this.populate('products.product')
  next()
})

export default model('carts', cartsSchema)
