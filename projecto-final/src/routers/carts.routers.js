const express = require('express')
const router = express.Router()

const ProductManager = require('../productManagerFileSystem')
const CartManager = require('../cartsManagerFileSystem.js')
const productService = new ProductManager()
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
    .post('/:cid/products/:pid', async (req, res) => {
        try {
            const { cid, pid } = req.params
            const { quantity = 1 } = req.body
    
            
            const product = productService.getProductById(parseInt(pid))
            if (product === 'Not found') {
                return res.status(404).json({ error: 'Product not found' })
            }
    
            const cart = await cartService.getCartById(parseInt(cid))
            if (cart === 'Product not found') {
                return res.status(404).json({ error: 'Cart not found' })
            }
    
            
            const existingProduct = cart.products.find((item) => item.pid === pid)
            if (existingProduct) {
                
                existingProduct.quantity += parseInt(quantity)
            } else {
                
                cart.products.push({ pid, quantity: parseInt(quantity) })
            }
    
            
            await cartService.updateCart(parseInt(cid), cart)
    
            res.json({
                status: 'success',
                payload: cart,
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: `Server Error ${error.message}` })
        }
    })

module.exports = router