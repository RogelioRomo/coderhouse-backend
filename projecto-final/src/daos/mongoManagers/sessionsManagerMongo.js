import usersModel from '../../models/users.model.js'

class SessionsManagerMongo {
  // READ
  async authUser (email, password) {
    const user = await usersModel.findOne({ email }).lean()

    if (user && user.password === password) {
      return user
    } else {
      return null
    }
  }
}
export default SessionsManagerMongo
