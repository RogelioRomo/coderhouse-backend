import UserDaoMongo from '../daos/Mongo/userDao.mongo.js'

class UserController {
  constructor () {
    this.userService = new UserDaoMongo()
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.userService.getUsers({ isActive: true })

      res.render('register.handlebars', { users })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  getUserById = async (req, res) => {
    try {
      const { uid } = req.params
      const users = await this.userService.getUserById({ _id: uid })

      res.json({
        status: 'success',
        result: users
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  updateUser = async (req, res) => {
    try {
      const { uid } = req.params
      const { body } = req
      const result = await this.userService.updateUser({ _id: uid }, body)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  deleteUser = async (req, res) => {
    try {
      const { uid } = req.params
      const result = await this.userService.deleteUser({ _id: uid }, { isActive: false })

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  registerUser = async (req, res) => {
    res.send({
      status: 'success',
      result: req.user
    })
  }
}

export default UserController
