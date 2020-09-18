const express = require('express')
const app = express()

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (username === 'demo' && password === 'demo') {
    req.session.authUser = { username }
    return res.json({ username })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

app.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

module.exports = {
  path: '/api/auth',
  handler: app
}