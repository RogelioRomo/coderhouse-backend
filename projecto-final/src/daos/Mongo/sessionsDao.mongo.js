import { isValidPassword } from '../../utils/passwords.js'
import usersModel from './models/users.model.js'

class SessionsDaoMongo {
  async authUser (email, password) {
    const user = await usersModel.findOne({ email }).lean()

    if (user && isValidPassword(password, user.password)) {
      return user
    } else {
      throw new Error('Invalid email or password')
    }
  }
}
export default SessionsDaoMongo
