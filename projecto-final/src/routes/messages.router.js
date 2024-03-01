import { Router } from 'express'
import MessagesController from '../controllers/messages.controller'

export const messagesRouter = Router()
const {
  getMessages,
  createMessage,
  updateMessage
} = new MessagesController()

messagesRouter
  .get('/', getMessages)
  .post('/', createMessage)
  .put('/:uid', updateMessage)
