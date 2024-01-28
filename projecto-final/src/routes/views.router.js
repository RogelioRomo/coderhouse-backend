/* eslint-disable multiline-ternary */
import { Router } from 'express'
import usersModel from '../models/users.model.js'
import productsModel from '../models/products.model.js'
import cartsModel from '../models/carts.model.js'

const router = Router()

router.get('/', (req, res) => {
  res.render('index', {})
})

router.get('/users', async (req, res) => {
  const { limit = 5, pageQuery = 1, sortBy = 'title', sortOrder = 'asc', keyword } = req.query
  const sort = {}
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1

  const matchCriteria = keyword ? {
    $or: [
      { first_name: new RegExp(keyword, 'i') },
      { last_name: new RegExp(keyword, 'i') },
      { email: new RegExp(keyword, 'i') }
    ]
  } : {}

  const {
    docs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    page
  } = await usersModel.paginate(matchCriteria, { limit, page: pageQuery, sort: { first_name: -1 }, lean: true })
  console.log(page)
  res.render('usersView.handlebars', {
    users: docs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    page
  })
})

router.get('/products', async (req, res) => {
  const { limit = 5, pageQuery = 1, sortBy = 'title', sortOrder = 'asc', keyword } = req.query
  const sort = {}
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1

  const matchCriteria = keyword ? {
    $or: [
      { title: new RegExp(keyword, 'i') },
      { description: new RegExp(keyword, 'i') },
      { category: new RegExp(keyword, 'i') }
    ]
  } : {}

  const {
    docs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    page
  } = await productsModel.paginate(matchCriteria, { limit, page: pageQuery, sort, lean: true })
  console.log(page)
  res.render('productsView.handlebars', {
    products: docs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    page
  })
})

router.get('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await cartsModel.findOne({ _id: cid }).lean().exec()

    if (!cart) {
      return res.render('cartsView.handlebars', { carts: [] })
    }

    await cartsModel.populate(cart, { path: 'products.product' })

    res.render('cartsView.handlebars', { carts: [cart] })
    console.log(cart.products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

export default router
