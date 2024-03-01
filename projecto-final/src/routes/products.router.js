import { Router } from 'express'
import ProductsController from '../controllers/products.controller'

export const productsRouter = Router()
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = new ProductsController()

productsRouter
  .get('/', getProducts)
  .get('/:pid', getProductById)
  .post('/', createProduct)
  .put('/:pid', updateProduct)
  .delete('/:pid', deleteProduct)
