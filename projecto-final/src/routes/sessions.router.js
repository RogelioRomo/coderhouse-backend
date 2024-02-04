import { Router } from 'express'

import SessionsManagerMongo from '../daos/mongoManagers/sessionsManagerMongo.js'
import UserManagerMongo from '../daos/mongoManagers/userManagerMongo.js'

const sessionsService = new SessionsManagerMongo()
const userService = new UserManagerMongo()
export const sessionsRouter = Router()

sessionsRouter
  .get('/login', async (req, res) => {
    try {
      const users = await userService.getUsers({ isActive: true })

      res.render('login.handlebars', { users })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .post('/login', async (req, res) => {
    try {
      const user = await sessionsService.authUser(req.body.email, req.body.password)
      console.log('Authenticated User:', user)
      if (user) {
        // res.send('Welcome!')
        req.session.user = user
        res.redirect('/products')
      } else {
        // res.send('Failed!')
        res.redirect('/api/sessions/login')
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .post('/logout', (req, res) => {
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
  })
