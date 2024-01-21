import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `${__dirname}/public/image`)
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`)
  }
})

export const uploader = multer({
  storage
})
