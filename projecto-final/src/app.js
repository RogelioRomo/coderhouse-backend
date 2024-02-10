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
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extends: true }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(session({
  secret: 'secr3t0',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://rogelioromo:hcNANrVJWq3xpg2h@projectbackend.ris7hha.mongodb.net/ecommerce?retryWrites=true&w=majority', mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true } })
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
