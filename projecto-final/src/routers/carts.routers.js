const express = require('express')
const CartManager = require('../cartsManagerFileSystem.js')
const router = express.Router()
const cartService = new CartManager()

router
    .post('/', async (req, res) => {
        try {
            const result = await cartService.createCart()
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            res.status(500).send(`Server Error ${error.message}`)
        }
    })
    .get('/:cid', async (req, res) => {
        try {
            const {cid} = req.params
            const cart = await cartService.getCartById(parseInt(cid))
            res.send({
                status: 'success',
                payload: cart
            })
        } catch (error) {
            console.log(error)
        }
    })
    .post('/:cid/products/:pid', (req, res) => {
        res.send('add product to carts')
    })

module.exports = router