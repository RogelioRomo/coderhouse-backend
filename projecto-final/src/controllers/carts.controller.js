import CartsDaoMongo from '../daos/Mongo/cartsDao.mongo.js'
import ProductsDaoMongo from '../daos/Mongo/productsDao.mongo.js'
import TicketDaoMongo from '../daos/Mongo/ticketDao.mongo.js'
class CartsController {
  constructor () {
    this.cartService = new CartsDaoMongo()
    this.productService = new ProductsDaoMongo()
    this.ticketService = new TicketDaoMongo()
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
      const carts = await this.cartService.getCartById(cid)

      res.json({
        status: 'success',
        result: carts
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  // createCart = async (req, res) => {
  //   try {
  //     const { body } = req
  //     const { product, quantity } = body

  //     let cart = await this.cartService.getCartById({ isActive: true })

  //     if (!cart) {
  //       const newCart = {
  //         products: [{
  //           product,
  //           quantity,
  //           isActive: true
  //         }]
  //       }
  //       cart = await this.cartService.createCart(newCart)
  //     } else {
  //       const updatedCart = {
  //         $push: {
  //           products: {
  //             product,
  //             quantity,
  //             isActive: true
  //           }
  //         }
  //       }
  //       cart = await this.cartService.updateCart({ _id: cart._id }, updatedCart)
  //     }

  //     console.log('cart:', cart)

  //     await this.productService.updateProduct(
  //       { _id: product },
  //       { $inc: { stock: -quantity } }
  //     )

  //     res.send({
  //       status: 'success',
  //       result: cart
  //     })
  //   } catch (error) {
  //     console.error(error)
  //     res.status(500).json({ error: error.message })
  //   }
  // }
  createCart = async (req, res) => {
    try {
      const { body } = req
      const { product, quantity } = body

      // Check if product has enough stock
      const productData = await this.productService.getProductById(product)
      if (productData.stock < quantity) {
        return res.status(400).json({ error: 'Not enough stock for this product' })
      }

      let cart = await this.cartService.getActiveCart()

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

  purchaseCart = async (req, res) => {
    try {
      const { cid } = req.params
      const cart = await this.cartService.getCartById(cid)

      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' })
      }

      let totalAmount = 0

      for (const item of cart.products) {
        const product = await this.productService.getProductById(item.product)
        if (product.stock < item.quantity) {
          // If the product doesn't have enough stock, remove it from the cart
          await this.cartService.deleteProductFromCart(cid, item.product)
        } else {
          // If the product has enough stock, subtract the quantity from the stock
          await this.productService.updateProductStock(item.product, -item.quantity)
          totalAmount += product.price * item.quantity
        }
      }

      const ticketReq = {
        body: {
          code: 'TICKET-' + Date.now(),
          purchase_datetime: new Date(),
          amount: totalAmount
        }
      }

      const ticketRes = {
        send: (data) => data,
        status: function (statusCode) {
          this.statusCode = statusCode
          return this
        },
        json: (data) => data
      }

      const ticket = await this.ticketService.createTicket(ticketReq, ticketRes)

      res.send({
        status: 'success',
        message: 'Purchase completed successfully',
        ticket
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
