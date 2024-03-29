import usersModel from '../../models/users.model.js'

class UserManagerMongo {
  // READ
  async getUsers (value) {
    return await usersModel.find(value).lean()
  }

  // READ BY ID
  async getUserById (uid) {
    return await usersModel.findOne(uid)
  }

  // CREATE
  async createUser (value) {
    return await usersModel.create(value)
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

export default UserManagerMongo
