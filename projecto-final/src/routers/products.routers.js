const express = require('express');
const router = express.Router()
const ProductManager = require('../productManagerFileSystem.js');
const products = new ProductManager();

//-----------------------------------------------------------------------------
//'READ' GET
//all products included ?limit=
router.get('/', (req, res) => {
    const limit = req.query.limit

    let productList = products.getProducts()

    productList = (!isNaN(Number(limit)) && Number(limit) > 0) ? productList.slice(0, Number(limit)) : productList

    res.json(productList)
});

//products by id
router.get('/:pid',(req, res) => {
    const productId = products.getProductById(Number(req.params.pid))

    productId === 'Not found'
    ? res.status(404).json({ error: 'Product not found' })
    : res.json(productId)
})

//-----------------------------------------------------------------------------
//'Create' POST
router.post('/', (req, res) => {
    const result = products.addProduct(req.body)

    res.status(result === 'Product added' ? 201 : 400).json({
        message: result === 'Product added' ? 'Product added successfully' : undefined,
        error: result !== 'Product added' ? result : undefined
    })
})

//-----------------------------------------------------------------------------
//'Update' PUT
router.put('/:pid', (req, res) => {
    const result = products.updateProduct(Number(req.params.pid), req.body)
    
    res.status(result === 'Product updated' ? 201 : 400).json({
        message: result === 'Product updated' ? 'Product updated successfully' : undefined,
        error: result !== 'Product updated' ? result : undefined
    })

})

//-----------------------------------------------------------------------------
//DELETE
router.delete('/:pid', (req, res) => {
    const result = products.deleteProduct(Number(req.params.pid))

    res.status(result === 'Product deleted' ? 201 : 400).json({
        message: result === 'Product deleted' ? 'Product deleted successfully' : undefined,
        error: result !== 'Product deleted' ? result : undefined
    })
    
})

module.exports = router