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

      res.render('carts.handlebars', { carts })
      // res.json({
      //   status: 'success',
      //   result: carts
      // })
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
        cart = await cartService.createCart({ products: [] })
      }

      cart.products.push({
        product,
        quantity,
        isActive: true
      })

      const updatedProduct = await productService.updateProduct(
        { _id: product },
        { $inc: { stock: -quantity } }
      )

      const result = await cartService.updateCart({ _id: cart._id }, cart)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .put('/:cid', async (req, res) => {
    try {
      const { cid } = req.params
      const { body } = req
      const result = await cartService.updateCart({ _id: cid }, body)

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
      const result = await cartService.deleteCart({ _id: cid }, { isActive: false })

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
