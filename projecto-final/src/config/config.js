import 'dotenv/config'
import { connect } from 'mongoose'

const MONGO_URL = process.env.MONGO_URL

export const connectDB = async () => {
  try {
    await connect(MONGO_URL)
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}
