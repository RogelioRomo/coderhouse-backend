//creamos una variable de express para importar las funcionalidades de la libreria
const express = require('express')

const app = express()

// http:// localhost:4000 o podemos tambien en el 8080
//utilizamos el metodo .get para decirle que queremos como request y
// y que queremos como respuesta en nuestro servidor local
//el parametro del '/' es el endpoint que cambiamos en el verbo get
app.get('/', (request, response) => {
    response.send('Bienvenidos a mi primer server express')
})

//diferente endpoint para mostrar que el navegador puede
//detectar el <h1>
app.get('/saludo', (request, response) => {
    response.send('<h1>Bienvenidos saludo</h1>')
})

//endpoint diferente para mostrar un objeto con formato JSON
app.get('/users', (request, response) => {
    response.send({
        nombre: 'Rogelio',
        apellido: 'Romo'
    })
})

//le decimos a nuesto servidor con el metodo .listen que escuche
//las peticiones que nosotros definimos anteriormente
//el console.log es solo para mostrar que se activo esta funcion
app.listen(4000, () => {
    console.log('Escuchando en el puerto 4000')
})