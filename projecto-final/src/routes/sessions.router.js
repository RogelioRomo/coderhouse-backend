import { Router } from 'express'
import passport from 'passport'
import SessionsController from '../controllers/sessions.controller'

export const sessionsRouter = Router()
const {
  login,
  passportLogin,
  logout,
  currentUser,
  githubCallback
} = new SessionsController()

sessionsRouter
  .get('/login', login)
  .get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {})
  .get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/sessions/login' }), githubCallback)

  .post('/logout', logout)
  .post('/login', passport.authenticate('login'), passportLogin)
  .get('/current', currentUser)
