import productsModel from './models/products.model.js'

class ProductsDaoMongo {
  // READ
  async getProducts (value) {
    return await productsModel.find(value).lean()
  }

  // READ BY ID
  async getProductById (pid) {
    return await productsModel.findOne(pid)
  }

  // CREATE
  async createProduct (value) {
    return await productsModel.create(value)
  }

  // UPDATE
  async updateProduct (pid, value) {
    return await productsModel.findByIdAndUpdate(pid, value)
  }

  // DELETE (logical)
  async deleteProduct (pid, value) {
    return await productsModel.findByIdAndUpdate(pid, value)
  }
}

export default ProductsDaoMongo
