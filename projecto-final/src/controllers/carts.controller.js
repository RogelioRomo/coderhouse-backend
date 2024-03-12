import CartsDaoMongo from '../daos/Mongo/cartsDao.mongo.js'
import ProductsDaoMongo from '../daos/Mongo/productsDao.mongo.js'

class CartsController {
  constructor () {
    this.cartService = new CartsDaoMongo()
    this.productService = new ProductsDaoMongo()
  }

  getCarts = async (req, res) => {
    try {
      const limit = req.query.limit
      let carts = await this.cartService.getCarts()

      carts = (!isNaN(Number(limit)) && Number(limit) > 0) ? carts.slice(0, Number(limit)) : carts
      console.log(carts)

      res.render('cartsApi.handlebars', { carts })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  getCartById = async (req, res) => {
    try {
      const { cid } = req.params
      const carts = await this.cartService.getCartById({ _id: cid })

      res.json({
        status: 'success',
        result: carts
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  createCart = async (req, res) => {
    try {
      const { body } = req
      const { product, quantity } = body

      let cart = await this.cartService.getCartById({ isActive: true })

      if (!cart) {
        const newCart = {
          products: [{
            product,
            quantity,
            isActive: true
          }]
        }
        cart = await this.cartService.createCart(newCart)
      } else {
        const updatedCart = {
          $push: {
            products: {
              product,
              quantity,
              isActive: true
            }
          }
        }
        cart = await this.cartService.updateCart({ _id: cart._id }, updatedCart)
      }

      console.log('cart:', cart)

      await this.productService.updateProduct(
        { _id: product },
        { $inc: { stock: -quantity } }
      )

      res.send({
        status: 'success',
        result: cart
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  updateCart = async (req, res) => {
    try {
      const { cid } = req.params
      const product = req.body
      const result = await this.cartService.updateCart(cid, product)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  updateCartQty = async (req, res) => {
    try {
      const { cid, pid } = req.params
      const { quantity } = req.body
      const result = await this.cartService.updateCartQty(cid, pid, quantity)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  deleteCart = async (req, res) => {
    try {
      const { cid } = req.params
      const result = await this.cartService.deleteCart(cid)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  deleteProductFromCart = async (req, res) => {
    try {
      const { cid, pid } = req.params
      const result = await this.cartService.deleteProductFromCart(cid, pid)

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

export default CartsController
