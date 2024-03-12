import MessagesDaoMongo from '../daos/Mongo/messagesDao.mongo.js'

class MessagesController {
  constructor () {
    this.messagesService = new MessagesDaoMongo()
  }

  getMessages = async (req, res) => {
    try {
      const messages = await this.messagesService.getMessages()
      res.render('messages.handlebars', { messages })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  createMessage = async (req, res) => {
    try {
      const { body } = req
      const result = await this.messagesService.createMessage(body)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  updateMessage = async (req, res) => {
    try {
      const { uid } = req.params
      const { body } = req
      const result = await this.messagesService.updateMessage({ _id: uid }, body)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default MessagesController
