import { Router } from 'express'
import { usersRouter } from './users.router.js'
import viewsRouter from './views.router.js'
import { productsRouter } from './products.router.js'
import { cartsRouter } from './carts.router.js'
import { messagesRouter } from './messages.router.js'

const router = Router()

router.use('/', viewsRouter)
router.use('/api/users', usersRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/messages', messagesRouter)

export default router
