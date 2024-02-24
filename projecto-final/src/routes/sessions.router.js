import { Router } from 'express'
import SessionsManagerMongo from '../daos/mongoManagers/sessionsManagerMongo.js'
import UserManagerMongo from '../daos/mongoManagers/userManagerMongo.js'
import passport from 'passport'

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
  .get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {})
  .get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/sessions/login' }), async (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
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
  .post('/login', passport.authenticate('login'), async (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
  })
  .get('/current', async (req, res) => {
    try {
      const user = req.session.user
      res.json({ user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
