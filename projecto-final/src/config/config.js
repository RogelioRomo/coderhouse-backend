import { connect } from 'mongoose'

export const connectDB = async () => {
  try {
    await connect('mongodb+srv://rogelioromo:hcNANrVJWq3xpg2h@projectbackend.ris7hha.mongodb.net/ecommerce?retryWrites=true&w=majority')
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}
