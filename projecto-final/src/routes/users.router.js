import { Router } from 'express'
import UserManagerMongo from '../daos/mongoManagers/userManagerMongo.js'

const userService = new UserManagerMongo()
export const usersRouter = Router()

usersRouter
  .get('/', async (req, res) => {
    try {
      const limit = req.query.limit
      let users = await userService.getUsers({ isActive: true })

      users = (!isNaN(Number(limit)) && Number(limit) > 0) ? users.slice(0, Number(limit)) : users
      console.log(users)

      res.render('users.handlebars', { users })
      // res.json({
      //   status: 'success',
      //   result: users
      // })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .get('/:uid', async (req, res) => {
    try {
      const { uid } = req.params
      const users = await userService.getUserById({ _id: uid })

      res.json({
        status: 'success',
        result: users
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .post('/', async (req, res) => {
    try {
      const { body } = req
      const result = await userService.createUser(body)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .put('/:uid', async (req, res) => {
    try {
      const { uid } = req.params
      const { body } = req
      const result = await userService.updateUser({ _id: uid }, body)

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .delete('/:uid', async (req, res) => {
    try {
      const { uid } = req.params
      const result = await userService.deleteUser({ _id: uid }, { isActive: false })

      res.send({
        status: 'success',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
