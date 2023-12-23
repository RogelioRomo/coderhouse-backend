const express = require('express')
const productsRouter = require('./routers/products.routers.js')
const cartsRouter = require('./routers/carts.routers.js')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


