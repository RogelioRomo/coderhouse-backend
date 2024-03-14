import productsModel from './models/products.model.js'

class ProductsDaoMongo {
  // READ
  async getProducts (value) {
    return await productsModel.find(value).lean()
  }

  // READ BY ID
  async getProductById (pid) {
    return await productsModel.findOne({ _id: pid })
  }

  // CREATE
  async createProduct (value) {
    return await productsModel.create(value)
  }

  // UPDATE
  async updateProduct (pid, value) {
    return await productsModel.findByIdAndUpdate(pid, value)
  }

  async updateProductStock (pid, quantity) {
    const product = await this.getProductById(pid)
    if (!product) {
      throw new Error('Product not found')
    }

    // Update the stock
    product.stock += quantity
    if (product.stock < 0) {
      product.stock = 0
    }

    return await productsModel.findByIdAndUpdate(pid, { stock: product.stock })
  }

  // DELETE (logical)
  async deleteProduct (pid, value) {
    return await productsModel.findByIdAndUpdate(pid, value)
  }
}

export default ProductsDaoMongo
