const express = require('express');
const app = express();
const ProductManager = require('./productManagerFileSystem');

const products = new ProductManager();


app.get('/products', (req, res) => {
    const limit = req.query.limit;

    let productList = products.getProducts();


    if (!isNaN(Number(limit)) && Number(limit) > 0) {
        productList = productList.slice(0, Number(limit));
    }


    res.send(productList);
});

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params
    const productPid = products.getProductById(Number(pid))

    res.send(productPid)
})

app.listen(4000, () => {
    console.log(`Server is running on http://localhost:4000`);
});

// INSTRUCCIONES 
//http://localhost:4000/products/    mostrara en cliente todos los productos
//http://localhost:4000/products/1   mostrara el producto con el id 1 (son actualmente 3 productos por lo que se puede cambiar de 1 a 3)

//http://localhost:4000/products?limit=    mostrara en cliente todos los productos
//http://localhost:4000/products?limit=1   mostrara solamente 1 producto (el 2 mostrara 2 y el 3 mostrara 3)