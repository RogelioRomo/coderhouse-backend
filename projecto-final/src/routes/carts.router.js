import { Router } from 'express'
import CartsController from '../controllers/carts.controller.js'
import isUser from '../middleware/isUser.js'

export const cartsRouter = Router()
const {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  updateCartQty,
  deleteCart,
  deleteProductFromCart,
  purchaseCart
} = new CartsController()

cartsRouter
  .get('/', getCarts)
  .get('/:cid', getCartById)
  .post('/', isUser, createCart)
  .post('/:cid/purchase', isUser, purchaseCart)
  .put('/:cid', isUser, updateCart)
  .put('/:cid/products/:pid', isUser, updateCartQty)
  .delete('/:cid', isUser, deleteCart)
  .delete('/:cid/products/:pid', isUser, deleteProductFromCart)
