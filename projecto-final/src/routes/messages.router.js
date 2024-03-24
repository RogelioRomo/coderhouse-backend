import { Router } from 'express'
import MessagesController from '../controllers/messages.controller.js'
import isUser from '../middleware/isUser.js'

export const messagesRouter = Router()
const {
  getMessages,
  createMessage,
  updateMessage
} = new MessagesController()

messagesRouter
  .get('/', isUser, getMessages)
  .post('/', isUser, createMessage)
  .put('/:uid', isUser, updateMessage)
