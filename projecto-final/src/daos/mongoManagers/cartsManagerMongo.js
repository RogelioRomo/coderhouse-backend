import cartsModel from '../../models/carts.model.js'

class CartsManagerMongo {
  // READ
  async getCarts (value) {
    return await cartsModel.find(value).lean()
  }

  // READ BY ID
  async getCartById (cid) {
    return await cartsModel.findOne(cid)
  }

  // CREATE
  async createCart (value) {
    return await cartsModel.create(value)
  }

  // UPDATE
  async updateCart (cid, value) {
    return await cartsModel.findByIdAndUpdate(cid, value)
  }

  // DELETE (logical)
  async deleteCart (cid, value) {
    return await cartsModel.findByIdAndUpdate(cid, value)
  }
}

export default CartsManagerMongo
