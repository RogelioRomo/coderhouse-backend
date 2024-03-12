import 'dotenv/config'
import passport from 'passport'
import local from 'passport-local'
import usersModel from '../daos/Mongo/models/users.model.js'
import { createHash, isValidPassword } from '../utils/hashBcrypt.js'
import GithubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_SECRET = process.env.GITHUB_SECRET
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL

export const initializePassport = () => {
  passport.use('register', new LocalStrategy({
    passReqToCallback: true, // accediendo al req
    usernameField: 'email'
  }, async (req, username, password, done) => {
    const { first_name, last_name, email, age } = req.body
    try {
      const user = await usersModel.findOne({ email })

      if (user) return done(null, false)

      const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password),
        age
      }

      const result = await usersModel.create(newUser)
      // done funciona como el next
      return done(null, result)
    } catch (error) {
      return done(error)
    }
  }))

  passport.use('login', new LocalStrategy({
    usernameField: 'email'
  }, async (username, password, done) => {
    try {
      const user = await usersModel.findOne({ email: username })
      if (!user) {
        console.log('user no encontrado')
        return done(null, false)
      }
      if (!isValidPassword(password, user.password)) return done(null, false)
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById({ _id: id })
    done(null, user)
  })

  passport.use('github', new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_SECRET,
    callbackURL: GITHUB_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('profile', profile)
    try {
      const user = await usersModel.findOne({ email: profile._json.email })
      if (!user) {
        const newUser = {
          first_name: profile._json.name,
          last_name: profile._json.name,
          email: profile._json.email
        }
        const result = await usersModel.create(newUser)
        return done(null, result)
      }
      return done(null, user)
    } catch (error) {
      done(error)
    }
  }))
}
