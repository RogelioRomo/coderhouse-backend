import ProductsDaoMongo from '../daos/Mongo/productsDao.mongo.js'

class ProductsController {
  constructor () {
    this.productService = new ProductsDaoMongo()
  }

  getProducts = async (req, res) => {
    try {
      const products = await this.productService.getProducts({ isActive: true })

      res.render('productsApi.handlebars', { products })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  getProductById = async (req, res) => {
    try {
      const { pid } = req.params
      const products = await this.productService.getProductById(pid)

      res.json({
        status: 'success',
        result: products
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  createProduct = async (req, res) => {
    try {
      const { body } = req
      const result = await this.productService.createProduct(body)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params
      const { body } = req
      const result = await this.productService.updateProduct({ _id: pid }, body)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  updateProductStock = async (req, res) => {
    try {
      const { pid } = req.params
      const { quantity } = req.body
      const result = await this.productService.updateProductStock(pid, quantity)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params
      const result = await this.productService.deleteProduct({ _id: pid }, { isActive: false })

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default ProductsController
