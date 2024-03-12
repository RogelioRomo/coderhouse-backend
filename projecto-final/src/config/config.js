import 'dotenv/config'
import { connect } from 'mongoose'

const MONGO_URL = process.env.MONGO_URL

export const configObject = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  secret: process.env.SECRET,
  persistence: process.env.PERSISTENCE
}

export const connectDB = async () => {
  try {
    await connect(MONGO_URL)
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}
