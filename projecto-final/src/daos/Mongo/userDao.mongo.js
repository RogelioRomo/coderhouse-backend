import { createHash } from '../../hashBcrypt.js'
import usersModel from './models/users.model.js'

class UserDaoMongo {
  // READ
  async getUsers (value) {
    return await usersModel.find(value).lean()
  }

  // READ BY ID
  async getUserById (uid) {
    return await usersModel.findOne(uid)
  }

  // UPDATE
  async updateUser (uid, value) {
    return await usersModel.findByIdAndUpdate(uid, value)
  }

  // DELETE (logical)
  async deleteUser (uid, value) {
    return await usersModel.findByIdAndUpdate(uid, value)
  }
}

export default UserDaoMongo
