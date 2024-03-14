function isUser (req, res, next) {
  if (req.session.user && req.session.user.role === 'user') {
    next()
  } else {
    res.status(403).send('Forbidden')
  }
}

export default isUser
