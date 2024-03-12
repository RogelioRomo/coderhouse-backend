import cartsModel from './models/carts.model.js'

class CartsDaoMongo {
  // READ
  async getCarts (value) {
    return await cartsModel.find(value).lean()
  }

  // READ BY ID
  async getCartById (cid) {
    const cart = await cartsModel.findOne(cid).lean()
    return cart || null
    // return cart ? [cart] : []
  }

  // CREATE
  async createCart (value) {
    return await cartsModel.create(value)
  }

  // UPDATE
  async updateCart (cid, product) {
    return await cartsModel.findByIdAndUpdate(
      cid,
      { $push: { products: product } },
      { new: true }
    )
  }

  // UPDATE only qty
  async updateCartQty (cid, pid, quantity) {
    return await cartsModel.findOneAndUpdate(
      { _id: cid, 'products.product': pid },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
    )
  }

  // DELETE (logical)
  async deleteCart (cid) {
    return await cartsModel.findByIdAndDelete(cid)
  }

  async deleteProductFromCart (cid, pid) {
    return await cartsModel.findByIdAndDelete(
      cid,
      { $pull: { products: pid } },
      { new: true }
    )
  }
}

export default CartsDaoMongo
