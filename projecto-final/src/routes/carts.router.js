import { Router } from 'express'
import CartsManagerMongo from '../daos/mongoManagers/cartsManagerMongo.js'
import ProductsManagerMongo from '../daos/mongoManagers/productsManagerMongo.js'

const productService = new ProductsManagerMongo()
const cartService = new CartsManagerMongo()
export const cartsRouter = Router()

cartsRouter
  .get('/', async (req, res) => {
    try {
      const limit = req.query.limit
      let carts = await cartService.getCarts()

      carts = (!isNaN(Number(limit)) && Number(limit) > 0) ? carts.slice(0, Number(limit)) : carts
      console.log(carts)

      res.render('cartsApi.handlebars', { carts })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .get('/:cid', async (req, res) => {
    try {
      const { cid } = req.params
      const carts = await cartService.getCartById({ _id: cid })

      res.json({
        status: 'success',
        result: carts
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .post('/', async (req, res) => {
    try {
      const { body } = req
      const { product, quantity } = body

      let cart = await cartService.getCartById({ isActive: true })

      if (!cart) {
        const newCart = {
          products: [{
            product,
            quantity,
            isActive: true
          }]
        }
        cart = await cartService.createCart(newCart)
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
        cart = await cartService.updateCart({ _id: cart._id }, updatedCart)
      }

      console.log('cart:', cart)

      await productService.updateProduct(
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
  })
  .put('/:cid', async (req, res) => {
    try {
      const { cid } = req.params
      const product = req.body
      const result = await cartService.updateCart(cid, product)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .put('/:cid/products/:pid', async (req, res) => {
    try {
      const { cid, pid } = req.params
      const { quantity } = req.body
      const result = await cartService.updateCartQty(cid, pid, quantity)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .delete('/:cid', async (req, res) => {
    try {
      const { cid } = req.params
      const result = await cartService.deleteCart(cid)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .delete('/:cid/products/:pid', async (req, res) => {
    try {
      const { cid, pid } = req.params
      const result = await cartService.deleteProductFromCart(cid, pid)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
