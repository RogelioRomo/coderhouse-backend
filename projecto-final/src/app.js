const express = require('express')
const productsRouter = require('./routers/products.routers.js')
const cartsRouter = require('./routers/carts.routers.js')
const handlebars = require('express-handlebars')
const { Server: ServerIO } = require('socket.io')
const ProductManager = require('./productManagerFileSystem.js')
const product = new ProductManager()

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

const io = new ServerIO(httpServer)

app.use('/api/products', productsRouter(io))
app.use('/api/carts', cartsRouter)

app.get('/', (req, res)=>{
    const products = product.getProducts()
    res.render('home.handlebars', {products})
})
app.get('/realtimeproducts', (req, res) => {
    const products = product.getProducts()
    res.render('realTimeProducts', { products })
})

io.on('connection', (socket) => {
    const currentProducts = product.getProducts()
    socket.emit('updateProducts', currentProducts)

    socket.on('addProduct', (formData) => {
        product.addProduct(formData)
        const updatedProducts = product.getProducts()
        io.emit('updateProducts', updatedProducts)
    })

    socket.on('deleteProduct', (formData) => {
        product.deleteProduct(formData.productId)
        const updatedProducts = product.getProducts()
        io.emit('updateProducts', updatedProducts)
    })
})