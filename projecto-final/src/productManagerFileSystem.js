const fs = require('fs')

class ProductManager {
    constructor() {
        this.products = []
        this.filePath = './src/jsonDB/products.json'
        this.loadProducts()
    }

    addProduct(product) {
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock ||
            !product.category ||
            !product.status
        )
            return 'Missing product details'

        const productCode = this.products.find((prod) => prod.code === product.code)

        if (productCode) return 'This code already exists in another product, please change'

        product.id = this.products.length === 0 ? 1 : this.products.length + 1
        this.products.push(product)

        this.saveProducts()

        return 'Product added'
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex((prod) => prod.id === id)

        if (index === -1) return 'Product not found'

        
        this.products[index] = { ...this.products[index], ...updatedProduct }

        this.saveProducts()

        return 'Product updated'
    }

    deleteProduct(id) {
        const index = this.products.findIndex((prod) => prod.id === id)

        if (index === -1) return 'Product not found'

        
        this.products.splice(index, 1)

        this.saveProducts()

        return 'Product deleted'
    }

    getProductById(id) {
        const productId = this.products.find((prod) => prod.id === id)

        if (!productId) return 'Not found'

        return productId
    }

    getProducts() {
        return this.products
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8')
            this.products = JSON.parse(data)
        } catch (error) {
            
            console.error('Error reading products file:', error.message)
        }
    }

    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2)
            fs.writeFileSync(this.filePath, data, 'utf8')
        } catch (error) {
            
            console.error('Error writing products file:', error.message)
        }
    }
}

const products = new ProductManager()


products.addProduct({
    title: 'Iphone 15 Pro Max', description: '256GB', price: 1500, thumbnail:'https://m.media-amazon.com/images/I/81fO2C9cYjL._AC_UF894,1000_QL80_.jpg', stock: 600, code: 'zxc123', category: 'Phone', status: true
})

products.addProduct({
    title: 'Samsung Galaxy S23 Ultra', description: '512GB', price: 1500, thumbnail: 'https://m.media-amazon.com/images/I/61dG6Y0U9rL._AC_UF894,1000_QL80_.jpg', stock: 350, code: 'zxc124', category: 'Phone', status: true
})

products.addProduct({
    title: 'Xiaomi 12', description: '256GB', price: 600, thumbnail: 'https://m.media-amazon.com/images/I/51x8Ql+mZLL._AC_SL1000_.jpg', stock: 800, code: 'zxc125', category: 'Phone', status: true
})

module.exports = ProductManager
