import { Router } from 'express'
import MessagesManagerMongo from '../daos/mongoManagers/messagesManagerMongo.js'

const messagesService = new MessagesManagerMongo()
export const messagesRouter = Router()

messagesRouter
  .get('/', async (req, res) => {
    try {
      const messages = await messagesService.getMessages()
      res.render('messages.handlebars', { messages })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .post('/', async (req, res) => {
    try {
      const { body } = req
      const result = await messagesService.createMessage(body)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .put('/:uid', async (req, res) => {
    try {
      const { uid } = req.params
      const { body } = req
      const result = await messagesService.updateMessage({ _id: uid }, body)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
