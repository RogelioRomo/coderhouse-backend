import 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import handlebars from 'express-handlebars'
import { __dirname, uploader } from './utils.js'
import appRouter from './routes/index.js'
import { connectDB } from './config/config.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { initializePassport } from './config/passport.config.js'

const app = express()
const PORT = 8080
const SECRET = process.env.SECRET
const MONGO_URL = process.env.MONGO_URL
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extends: true }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(session({
  secret: SECRET,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URL })
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.post('/file', uploader.single('myFile'), (req, res) => {
  res.send('Image uploaded')
})

app.use(appRouter)

app.listen(PORT, (err) => {
  if (err) console.log(err)
  console.log(`Server listening in port ${PORT}`)
})
