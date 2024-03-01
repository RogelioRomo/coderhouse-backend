import { Router } from 'express'
import CartsController from '../controllers/carts.controller'

export const cartsRouter = Router()
const {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  updateCartQty,
  deleteCart,
  deleteProductFromCart
} = new CartsController()

cartsRouter
  .get('/', getCarts)
  .get('/:cid', getCartById)
  .post('/', createCart)
  .put('/:cid', updateCart)
  .put('/:cid/products/:pid', updateCartQty)
  .delete('/:cid', deleteCart)
  .delete('/:cid/products/:pid', deleteProductFromCart)
