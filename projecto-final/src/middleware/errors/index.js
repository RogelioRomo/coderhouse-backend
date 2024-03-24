import { EErrors } from '../../errors/enum'

export const handleErrors = (error, req, res, done) => {
  console.log(error.cause)

  switch (error.code) {
    case EErrors.INVALID_TYPE_ERROR:
      return res.send({ status: 'Error', error: error.name })

    default:
      return res.send({ status: 'Error', error: 'Server Error' })
  }
}
