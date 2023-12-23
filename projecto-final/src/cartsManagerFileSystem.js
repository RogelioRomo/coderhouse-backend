const fs = require('fs/promises')

class CartManager {
    constructor() {
        this.filePath = './src/jsonDB/carts.json'
    }

    async readFile(){
        try {
            const dataCarts = await fs.readFile(this.filePath, 'utf-8')
            return JSON.parse(dataCarts)
        } catch (error) {
            return[]
        }
    }

    async createCart(){
        try {
            const carts = await this.readFile()
            let newCart = {
                id: carts.length + 1,
                products: []
            }
            carts.push(newCart)
            await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2), 'utf-8')
            return newCart
        } catch (error) {
            return `Error creating the cart ${error}`
        }
    }

    async getCartById(cid){
        try {
            const carts = await this.readFile()
            const cart = carts.find(cart => cart.id === cid)
            if (!cart) return 'Product not found'
            return cart
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CartManager

/* carts = [
    {
        id: 'asdfas6dfas75667',
        products: [
            {
                product: 'k3452h2345h',
                quantity: 12
            },
            {
                product: 'k3452h2345h',
                quantity: 12
            },
        ]
    },
    {
        id: 'asdfas6dfas75667',
        products: [
            {
                product: 'k3452h2345h',
                quantity: 12
            },
            {
                product: 'k3452h2345h',
                quantity: 12
            },
        ]
    }
]*/