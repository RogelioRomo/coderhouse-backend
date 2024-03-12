import UserDaoMongo from '../daos/Mongo/userDao.mongo.js'
import { Session } from 'express-session'

class SessionsController {
  constructor () {
    this.userService = new UserDaoMongo()
  }

  login = async (req, res) => {
    try {
      const users = await this.userService.getUsers({ isActive: true })

      res.render('login.handlebars', { users })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  passportLogin = async (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
  }

  githubCallback = async (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
  }

  logout = async (req, res) => {
    try {
      req.session.destroy(err => {
        if (err) {
          console.error('Error destroying session:', err)
          res.send('Failed!')
          // return res.redirect('/')
        } else {
          res.clearCookie('connect.sid')
          res.redirect('/api/sessions/login')
        }
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

  currentUser = async (req, res) => {
    try {
      const user = req.session.user
      res.json({ user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default SessionsController
