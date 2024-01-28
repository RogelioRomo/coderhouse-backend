import { Router } from 'express'
import ProductsManagerMongo from '../daos/mongoManagers/productsManagerMongo.js'

const productService = new ProductsManagerMongo()
export const productsRouter = Router()

productsRouter
  .get('/', async (req, res) => {
    try {
      const products = await productService.getProducts({ isActive: true })

      res.render('productsApi.handlebars', { products })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .get('/:pid', async (req, res) => {
    try {
      const { pid } = req.params
      const products = await productService.getProductById({ _id: pid })

      res.json({
        status: 'success',
        result: products
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .post('/', async (req, res) => {
    try {
      const { body } = req
      const result = await productService.createProduct(body)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .put('/:pid', async (req, res) => {
    try {
      const { pid } = req.params
      const { body } = req
      const result = await productService.updateProduct({ _id: pid }, body)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .delete('/:pid', async (req, res) => {
    try {
      const { pid } = req.params
      const result = await productService.deleteProduct({ _id: pid }, { isActive: false })

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
