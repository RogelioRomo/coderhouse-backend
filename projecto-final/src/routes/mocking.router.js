import { Router } from 'express'
import { faker } from '@faker-js/faker'

export const mockingRouter = Router()

const generateUser = () => {
  return {
    id: faker.database.mongodbObjectId(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 99 }),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(['admin', 'user']),
    isActive: faker.datatype.boolean(1.0)
  }
}

const generateProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: faker.image.url(),
    stock: faker.number.int(),
    code: faker.string.alphanumeric(8),
    category: faker.commerce.department(),
    isActive: faker.datatype.boolean(1.0)
  }
}

mockingRouter
  .get('/users', (req, res) => {
    const users = []
    for (let i = 0; i < 10; i++) {
      users.push(generateUser())
    }
    res.send({
      status: 'success',
      payload: users
    })
  })
  .get('/products', (req, res) => {
    const products = []
    for (let i = 0; i < 10; i++) {
      products.push(generateProduct())
    }
    res.send({
      status: 'success',
      payload: products
    })
  })
