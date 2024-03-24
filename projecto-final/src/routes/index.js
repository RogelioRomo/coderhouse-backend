import { Router } from 'express'
import { usersRouter } from './users.router.js'
import viewsRouter from './views.router.js'
import { productsRouter } from './products.router.js'
import { cartsRouter } from './carts.router.js'
import { messagesRouter } from './messages.router.js'
import { sessionsRouter } from './sessions.router.js'
import { mockingRouter } from './mocking.router.js'

const router = Router()

router.use('/', viewsRouter)
router.use('/api/register', usersRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/messages', messagesRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/api/mocking', mockingRouter)

export default router
