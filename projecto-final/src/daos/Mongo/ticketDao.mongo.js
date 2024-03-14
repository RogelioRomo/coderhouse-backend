import ticketModel from './models/ticket.model.js'

class TicketDaoMongo {
  // READ
  async getTickets (value) {
    return await ticketModel.find(value).lean()
  }

  // READ BY ID
  async getTicketById (uid) {
    return await ticketModel.findOne(uid)
  }

  // CREATE
  // async createTicket (value) {
  //   return await ticketModel.create(value)
  // }
  async createTicket (req, res) {
    try {
      const newTicket = await ticketModel.create(req.body)
      return res.status(201).json(newTicket)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  // UPDATE
  async updateTicket (uid, value) {
    return await ticketModel.findByIdAndUpdate(uid, value)
  }

  // DELETE (logical)
  async deleteTicket (uid, value) {
    return await ticketModel.findByIdAndUpdate(uid, value)
  }
}

export default TicketDaoMongo
