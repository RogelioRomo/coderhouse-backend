import { configObject, connectDB } from '../config/config.js'

let UserDao
let ProductDao
let CartsDao
let SessionDao
let MessagesDao
let TicketDao

switch (configObject.persistence) {
  case 'FILE':

    break
  case 'MEMORY':

    break

  default:{
    const UserDaoMongo = (import('./Mongo/userDao.mongo.js')).default
    UserDao = UserDaoMongo

    const ProductDaoMongo = (import('./Mongo/productDao.mongo.js')).default
    ProductDao = ProductDaoMongo

    const CartsDaoMongo = (import('./Mongo/cartsDao.mongo.js')).default
    CartsDao = CartsDaoMongo

    const SessionDaoMongo = (import('./Mongo/sessionDao.mongo.js')).default
    SessionDao = SessionDaoMongo

    const MessagesDaoMongo = (import('./Mongo/messagesDao.mongo.js')).default
    MessagesDao = MessagesDaoMongo

    const TicketDaoMongo = (import('./Mongo/ticketDao.mongo.js')).default
    TicketDao = TicketDaoMongo

    break
  }
}

export { UserDao, ProductDao, CartsDao, SessionDao, MessagesDao, TicketDao }
