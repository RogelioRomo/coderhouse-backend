import { Router } from 'express'
import ProductsController from '../controllers/products.controller.js'
import isAdmin from '../middleware/isAdmin.js'

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
  .post('/', isAdmin, createProduct)
  .put('/:pid', isAdmin, updateProduct)
  .delete('/:pid', isAdmin, deleteProduct)
