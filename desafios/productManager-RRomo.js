class ProductManager{
    constructor() {
        this.products = []
    }

    addProduct(product) {
        if(
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock
        ){
            return 'Missing product details'
        }

        const productCode = this.products.find(prod => prod.code === product.code)
        
        if (productCode) {
            return 'This code already exists in other product, please change'
        }
        
        product.id = this.products.length === 0 ? 1 : this.products.length + 1
        this.products.push(product)

        return 'Product added'
    }

    getProductById(id) {
        const productId  = this.products.find(prod => prod.id === id)
        if (!productId ) {
            return 'Not found'
        }
        return productId 
    }

    getProducts() {
        return this.products
    }
}

const products = new ProductManager()
products.addProduct({ title: 'Iphone 15 Pro Max', description: '256GB', price: 1500, thumbnail: 'https://m.media-amazon.com/images/I/81fO2C9cYjL._AC_UF894,1000_QL80_.jpg', stock: 600, code: 'zxc123' })
products.addProduct({ title: 'Samsung Galaxy S23 Ultra', description: '512GB', price: 1500, thumbnail: 'https://m.media-amazon.com/images/I/61dG6Y0U9rL._AC_UF894,1000_QL80_.jpg', stock: 350, code: 'zxc124' })
products.getProductById(3)
products.getProducts()