import TicketDaoMongo from '../daos/Mongo/ticketDao.mongo'

class TicketController {
  constructor () {
    this.ticketService = new TicketDaoMongo()
  }

  createTicket = async (req, res) => {
    try {
      const { body } = req
      const result = await this.ticketService.createTicket(body)

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

export default TicketController
