import messagesModel from '../../models/messages.model.js'

class MessagesManagerMongo {
  async getMessages (value) {
    return await messagesModel.find(value).lean()
  }

  async createMessage (value) {
    return await messagesModel.create(value)
  }

  async updateMessage (uid, value) {
    return await messagesModel.findByIdAndUpdate(uid, value)
  }
}

export default MessagesManagerMongo
