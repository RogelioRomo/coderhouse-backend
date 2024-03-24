class CustomError {
  static createError ({ name = 'Error', cause = '', message = 'undefined', code = 1 }) {
    const error = new Error(message)
    error.name = name
    error.code = code
    error.cause = cause
    throw error
  }
}

export default CustomError
