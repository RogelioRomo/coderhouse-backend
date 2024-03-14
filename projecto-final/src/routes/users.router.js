import { Router } from 'express'
import passport from 'passport'
import UserController from '../controllers/users.controller.js'

export const usersRouter = Router()
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser
} = new UserController()

usersRouter
  .get('/', getUsers)
  .get('/:uid', getUserById)
  .put('/:uid', updateUser)
  .delete('/:uid', deleteUser)
  .post('/', passport.authenticate('register'), registerUser)
